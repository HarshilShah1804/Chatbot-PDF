# PDF - ChatBot

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Contributors](#contributors)

## Introduction

[![GitHub issues](https://img.shields.io/github/issues/HarshilShah1804/Chatbot-PDF)](https://github.com/HarshilShah1804/Chatbot-PDF/issues)
[![GitHub stars](https://img.shields.io/github/stars/HarshilShah1804/Chatbot-PDF)](https://github.com/HarshilShah1804/Chatbot-PDF/stargazers)
[![GitHub license](https://img.shields.io/github/license/HarshilShah1804/Chatbot-PDF)](https://github.com/HarshilShah1804/Chatbot-PDF/blob/main/LICENSE)

This repository contains a Flask-based web application that allows users to upload PDF files and interact with the chatbot to get responses to their queries on the content of the uploaded PDF. This project was developed for the summer projects released by Metis Club, IIT Gandhinagar. The LLM used was Llama3 by Meta, and the tech stack in frontend included HTML, CSS, Javascript, and FetchAPI integration; in backend, Python and Flask were used.

## Features

- Efficient reading of pdf files using Llamaparse
- Interactive UI that simulates chatting

## Screenshots

![image](https://github.com/user-attachments/assets/80fba9a1-8ffe-452b-856e-cd92fd8a7cee)

![image](https://github.com/user-attachments/assets/17300f0f-5a6e-43ed-b608-e3b676bbc6de)


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
In Chatbot.py, add your Gradient access token and workspace ID and your llamaindex API key
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

## Usage

The app is configured in a way that it will not give answers to questions outside the scope of the PDF.
### Uploading a PDF.
1. Click on the "Upload" button.
2. Select the PDF file from your system. It will be automatically uploaded.

### Asking a query
1. After uploading a PDF, the bot will take some time to parse it, and a prompt will appear once it is ready to answer your queries.
2. After getting the prompt, type your query in the text box and click the send button.

## License
Distributed under the Apache License 2.0. See LICENSE for more information.

## Contributing

Contributions make the open-source community such an amazing place to be, learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contributors
[Harshil Shah](https://github.com/HarshilShah1804) | 
[Rishank Soni](https://github.com/RishankSoni) | 
[Samarth Sonawane](https://github.com/samarth2015)

