# import OS module
# import os
# # Get the list of all files and directories
# path = "C:/inetpub/wwwroot/Confluencia/Baterias/"
# dir_list = os.listdir(path)
# print("Files and directories in '", path, "' :")
# # prints all files
# print(dir_list)
# for n in dir_list:
#     if (n[0:9]=='Cubiertas'):
#         print (n)
#         os.rename(n , n.replace("Cubiertas", "Baterias"))

# print(dir_list)


import os

def rename_files(directory, old_string, new_string):
    """
    Renames files in a directory by replacing a string in their names.

    Args:
        directory (str): The path to the directory containing the files.
        old_string (str): The string to be replaced.
        new_string (str): The string to replace with.
    """
    for filename in os.listdir(directory):
        if old_string in filename:
            new_name = filename.replace(old_string, new_string)
            os.rename(os.path.join(directory, filename), os.path.join(directory, new_name))

# Example usage:
directory_path = "C:/inetpub/wwwroot/Confluencia/Baterias/"  # Replace with the actual directory path
old_str = "Cubiertas"
new_str = "Baterias"
rename_files(directory_path, old_str, new_str)