import pandas as pd
import numpy as np


def str_to_dict(string):
    if isinstance(string, str):
        labels = string.split("|")
        dict_labels = {}
        for label in labels:
            if "," in label:
                lb = label.split(",")
                n = lb[0].strip()
                value = lb[1].strip()
                dict_labels[n] = value
        return dict_labels
    else:
        return {}


def make_row(row):
    final_string = ""
    for element in row:
        if element != "":
            if final_string == "":
                final_string = element
            else:
                final_string += f"; {element}"
    return final_string


def undo_one_hot(data, variable, variable_dict):
    actual_column_detruc = []
    for value in variable_dict.keys():
        current_variable = f"{variable}___{value}"
        stringify_var_column = data[current_variable].apply(
            lambda x: f"{x:1.0f}")
        current_variable_info = [variable_dict[value] if val ==
                                 "1" else "" for val in list(stringify_var_column)]
        actual_column_detruc.append(current_variable_info)
    actual_column_detruc = np.array(actual_column_detruc)
    labels = [make_row(actual_column_detruc[:, i])
              for i in range(actual_column_detruc.shape[1])]
    return labels


def label_decoder(data: pd.DataFrame, dict_data: pd.DataFrame):
    dict_data['encoding_dictionary'] = dict_data['Choices, Calculations, OR Slider Labels'].apply(
        str_to_dict)
    dict_data['Field Type'].unique()
    dict_data.head(10)
    dict_data.set_index(['Variable / Field Name'], inplace=True)

    corrected_data = pd.DataFrame()
    for variable in data.columns:
        if variable in list(dict_data.index):
            variable_dict = dict_data.loc[variable, 'encoding_dictionary']
            if len(variable_dict) > 0 and dict_data.loc[variable, 'Field Type'] != 'calc':
                stringify_var_column = data[variable].apply(
                    lambda x: f"{x:1.0f}")
                possible_variable_values = stringify_var_column.unique()
                for value in stringify_var_column:
                    if value not in variable_dict:
                        variable_dict[value] = ''
                corrected_data[variable] = stringify_var_column.replace(
                    variable_dict)
            else:
                corrected_data[variable] = data[variable]
        elif "___" in variable:
            aux_variable = variable.split("___")[0]
            if aux_variable not in corrected_data.columns:
                variable_dict = dict_data.loc[aux_variable,
                                              'encoding_dictionary']
                corrected_data[aux_variable] = undo_one_hot(
                    data, aux_variable, variable_dict)
        else:
            pass
            # print(variable)
    return corrected_data


if __name__ == "__main__":
    data = pd.read_csv("data.csv")
    dict_data = pd.read_csv("data_dictionary.csv")

    corrected_data = label_decoder(data, dict_data)
    print(corrected_data.head())
