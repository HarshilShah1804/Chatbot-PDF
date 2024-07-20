# Import the dependencies
from llama_index.core import ServiceContext
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from llama_index.embeddings.gradient import GradientEmbedding
from llama_index.llms.gradient import GradientBaseModelLLM
from llama_index.core.memory import ChatMemoryBuffer
from llama_parse import LlamaParse
import os

# Set up the environment varianbles
os.environ['GRADIENT_ACCESS_TOKEN'] = "YOUR_GRADIENT_ACCESS_TOKEN"
os.environ['GRADIENT_WORKSPACE_ID'] = "YOUR_GRADIENT_WORKSPACE_ID"

# Create PDF-Chatbot class
class PDF_Chatbot:
    # Initial Setup
    def __init__(self):
        self.document=None
        self.llm = GradientBaseModelLLM(
        base_model_slug="llama3-8b-chat",
        max_tokens=400,
        )

        self.embed_model = GradientEmbedding(
            gradient_access_token = os.environ["GRADIENT_ACCESS_TOKEN"],
            gradient_workspace_id = os.environ["GRADIENT_WORKSPACE_ID"],
            gradient_model_slug="bge-large",
        )

        self.service_context = ServiceContext.from_defaults(
            chunk_size = 512, llm = self.llm, embed_model = self.embed_model
        )
        self.chat_engine = None
        self.memory = None
        self.index = None  

    # Function to parse the uploaded pdf using LlamaParse
    def parse(self,name):
        parser = LlamaParse(
            api_key="your_api_key",  # Llama Index API key
            result_type="markdown",  
            verbose=True
        )

        self.document = parser.load_data(name)

        self.memory = ChatMemoryBuffer.from_defaults(token_limit=2000)
        self.index = VectorStoreIndex.from_documents(self.document, service_context=self.service_context)
        self.chat_engine = self.index.as_chat_engine(
            chat_mode="context",
            memory=self.memory,  # Add memory of context to the model
            system_prompt=( 
                "You are formal chatbot. Give your answer in html rendering, without <html> and <body> tags. Only answer if it is present in the pdf."  #Initial Prompt given to the model
            ),
        )

    # Function to respond the query of the user
    def query(self, query):
        response = self.chat_engine.chat(query)
        # print(response)
        return response
