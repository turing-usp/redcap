import pandas as pd
from data_transform.label_decoder import label_decoder
from data_load.uploadCsvToAws import load_to_aws

from dotenv import load_dotenv
load_dotenv()

datapath = "data.csv"
dictpath = "data_dictionary.csv"

dataframe = pd.read_csv(datapath)
dictframe = pd.read_csv(dictpath)

dataframe = label_decoder(dataframe, dictframe)
load_to_aws(dataframe)
