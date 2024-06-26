from llama_index.core import ServiceContext
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, StorageContext
from llama_index.embeddings.gradient import GradientEmbedding
from llama_index.llms.gradient import GradientBaseModelLLM
from llama_index.core.memory import ChatMemoryBuffer
from llama_parse import LlamaParse
import os


os.environ['GRADIENT_ACCESS_TOKEN'] = "ITCAjsv0jUN01CT0TQ6bFcdeYKduw01e"
os.environ['GRADIENT_WORKSPACE_ID'] = "89d595bc-bba8-4ea5-9bd8-d5ecbf224947_workspace"

class PDF_Chatbot:
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
        
    def parse(self,name):
        parser = LlamaParse(
            api_key="llx-sCCsgFLBIwEUSbDXuq9TMZT8fZV5P12xpgjdDN3CBTekFxr5",  
            result_type="markdown",  
            verbose=True
        )

        self.document = parser.load_data(f"uploads\{name}")
    
    def query(self, query):
        memory = ChatMemoryBuffer.from_defaults(token_limit=2000)
        index = VectorStoreIndex.from_documents(self.document, service_context=self.service_context)
        chat_engine = index.as_chat_engine(
            chat_mode="context",
            memory=memory,
            system_prompt=(
                "You are formal chatbot. Give your answer in html rendering, without <html> and <body> tags."
            ),
        )

        response = chat_engine.chat(query)
        print(response)
        return response
