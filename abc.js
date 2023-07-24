import re

def format_string(input_string, line_length=20):
    # Find all inner strings using regex and replace them with placeholders
    inner_strings = re.findall(r'\'\'(.*?)\'\'', input_string)
    for inner_str in inner_strings:
        if len(inner_str) > line_length:
            input_string = input_string.replace(f"''{inner_str}''", f"\n{inner_str}\n")
        else:
            input_string = input_string.replace(f"''{inner_str}''", f"__{inner_str}__")

    words = input_string.split()
    lines = []
    current_line = ""

    for word in words:
        if len(current_line) + len(word) + 1 <= line_length:
            current_line += word + " "
        else:
            lines.append(current_line.strip())
            current_line = word + " "

    # Add the last line
    if current_line:
        lines.append(current_line.strip())

    # Replace placeholders with original inner strings
    for i, line in enumerate(lines):
        for inner_str in inner_strings:
            placeholder = f"__{inner_str}__"
            if placeholder in line:
                lines[i] = line.replace(placeholder, f"''{inner_str}''")

    return "\n".join(lines)

# Test case
input_string = "if 'abc fdg jddj sfgh' ghgfhh dkd"
formatted_string = format_string(input_string, line_length=20)
print(formatted_string)
