from flask import Flask, request, render_template, redirect, url_for, flash,jsonify
from werkzeug.utils import secure_filename
import os
from chatbot import PDF_Chatbot  

# Inititalize the flask application
app = Flask(__name__)

# App Configuration 
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['ALLOWED_EXTENSIONS'] = {'pdf'}
app.secret_key = 'supersecretkey'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


# Function to check if the uploaded file extension is allowed
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config['ALLOWED_EXTENSIONS']

# Flag for checking if a file is uploaded.
upload = False

#Initialize the chatbot.
bot = PDF_Chatbot()


@app.route('/')
def index():
    # Render the index page, passing the file name if uplaoded
    return render_template('index.html', file = filename_global if upload else "No PDF uploaded")

@app.route('/upload', methods=['POST'])
# Function to handle the file upload request.
def upload_file():
    if 'file' not in request.files:
        flash('No file part')
        return "No file found"
    file = request.files['file']    
    if file.filename == '':
        flash('No selected file')
        return "Upload a valid file"
    # If uploaded properly file is stored in the uploads folder.
    if file and allowed_file(file.filename):
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('File uploaded successfully')
        global upload
        upload = True
        global filename_global
        filename_global = filename

        # Initialize the parsing of file by the chatbot.
        bot.parse(filename)
        return "Upload successful! Let's chat!"
    else:
        flash('Invalid file format. Only PDFs are allowed.')
        return "Invalid file format. Only PDFs are allowed."

@app.route('/query',methods=['POST'])
#Function to handle the query request.
def query():
    if not upload:
        return "Please upload a file first"
    #print(request.form)
    form_data = dict(request.form)
    #print(form_data)
    #print(form_data['textarea']) 
    # response = bot.query("Summarize")
    
    # Getting response from the chatbot
    response = bot.query(form_data['textarea'])
    # response = str(response).replace("\n","<br>")
    return str(response)

#Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
