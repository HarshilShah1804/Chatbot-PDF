from flask import Flask, request, render_template, redirect, url_for, flash,jsonify
from werkzeug.utils import secure_filename
import os
from chatbot import PDF_Chatbot

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.secret_key = 'supersecretkey'
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

upload = False
bot = PDF_Chatbot()
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    
    if 'file' not in request.files:
        flash('No file part')
        return redirect(request.url)
    file = request.files['file']    
    if file.filename == '':
        flash('No selected file')
        return redirect(request.url)
    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('File uploaded successfully')
        global upload
        upload = True
        bot.parse(filename)
        return redirect(url_for('index'))
    else:
        flash('Invalid file format. Only PDFs are allowed.')
        return redirect(request.url)

@app.route('/query',methods=['POST'])

def query():
    if not upload:
        return "Please upload a file first"
    print(request.form)
    form_data = dict(request.form)
    print(form_data)
    print(form_data['textarea']) 
    # response = bot.query("Summarize")
    response = bot.query(form_data['textarea'])
    # response = str(response).replace("\n","<br>")
    return str(response)

if __name__ == '__main__':
    app.run(debug=True)
