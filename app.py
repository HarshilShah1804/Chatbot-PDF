from flask import Flask, request, render_template, flash, send_from_directory
from werkzeug.utils import secure_filename
import os
from chatbot import PDF_Chatbot

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = os.path.abspath('uploads')
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  
app.config['SECRET_KEY'] = 'secret'

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

upload = False
bot = PDF_Chatbot()
filename_global = ""

@app.route('/')
def index():
    return render_template('index.html', file=filename_global if upload else "No PDF uploaded")

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return "No file found"

    file = request.files['file']
    print("File", file)

    if file.filename == '':
        flash('No selected file')
        return "Upload a valid file"

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)

        # Save file to the UPLOAD_FOLDER
        temp_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        print(f"Saving file to temporary path: {temp_path}")
        file.save(temp_path)

        # Debug statement to ensure the file was saved correctly
        if not os.path.exists(temp_path):
            print(f"File not found at {temp_path}")
            return f"File not found at {temp_path}", 500

        flash('File uploaded successfully')
        global upload
        upload = True
        global filename_global
        filename_global = filename
        bot.parse(temp_path)
        return "Upload successful! Let's chat!"
    else:
        flash('Invalid file format. Only PDFs are allowed.')
        return "Invalid file format. Only PDFs are allowed."

@app.route('/query', methods=['POST'])
def query():
    if not upload:
        return "Please upload a file first"
    form_data = dict(request.form)
    response = bot.query(form_data['textarea'])
    return str(response)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    # Construct the full file path
    full_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    print(f"Serving file from: {full_path}")
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
