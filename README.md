# PDF - ChatBot
This repository contains a Flask-based web application that allows users to upload PDF files and interact with the chatbot to get response to their queries on the content of the uploaded PDF.

## Installation
### Clone the repository
```git
git clone https://github.com/HarshilShah1804/Chatbot-PDF.git
cd Chatbot-PDF
```
### Install Dependencies
```python
pip install -r requirements.txt
```
### Setting up Environment Variables
In Chatbot.py add your Gradient access token and workspace id and your llamaindex API key
```python
os.environ['GRADIENT_ACCESS_TOKEN'] = "YOUR_GRADIENT_ACCESS_TOKEN"
os.environ['GRADIENT_WORKSPACE_ID'] = "YOUR_GRADIENT_WORKSPACE_ID"
```
```python
api_key="your_api_key"
```
### Run the application
```bash
python app.py
```
By default, the application will be accessible at http://127.0.0.1:5000/.

## Using the Application
The app is configured in a way such that ir will not give answers to questions outside the scope of the PDF.
### Uploading a PDF.
1. Click on the "Upload" button.
2. Select the PDF file from your system. It will be automatically uplaoded.

### Asking a query
1. After uploading a PDF, the bot will take some time to parse it and a prompt will be shown once it is ready to answer your queries.
2. After getting the prompt, type your query in the text-box and click on the send button.
