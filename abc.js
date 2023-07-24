import re

def break_string(input_string, max_length=20):
    # Find all inner strings and replace them with a placeholder to avoid breaking them prematurely
    inner_strings = re.findall(r'\'\'(.*?)\'\'', input_string)
    for inner_string in inner_strings:
        input_string = input_string.replace(f"''{inner_string}''", f"__INNER_{len(inner_string)}__")

    words = input_string.split()
    current_line = []
    lines = []

    for word in words:
        # If adding the current word exceeds the max_length, start a new line
        if len(' '.join(current_line + [word])) > max_length:
            lines.append(' '.join(current_line))
            current_line = []

        # If the word contains the placeholder for an inner string, add it as a whole to the next line
        if '__INNER_' in word:
            lines.append(word.replace('__', '').replace('_', ' '))
        else:
            current_line.append(word)

    if current_line:
        lines.append(' '.join(current_line))

    return '\n'.join(lines)

# Test case
input_str = "This is a long string with ''an inner string'' in it, which should not be broken."
result = break_string(input_str, max_length=20)
print(result)
