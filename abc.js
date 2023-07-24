import re

def break_string_with_inner_words(input_string, line_length=20):
    # Find all inner strings and replace them with a placeholder.
    inner_strings = re.findall(r'\'\'(.*?)\'\'', input_string)
    placeholder = 'INNER_STRING_PLACEHOLDER'
    for inner_string in inner_strings:
        input_string = input_string.replace("''" + inner_string + "''", placeholder)

    # Split the string into words.
    words = input_string.split()

    # Reconstruct the lines by considering inner strings as one word.
    lines = []
    current_line = ''
    for word in words:
        if word == placeholder:
            if len(current_line) > 0:
                lines.append(current_line)
                current_line = ''
            lines.append(word)
        elif len(current_line) + len(word) + 1 <= line_length:
            current_line += ' ' + word if len(current_line) > 0 else word
        else:
            lines.append(current_line)
            current_line = word

    if len(current_line) > 0:
        lines.append(current_line)

    return '\n'.join(lines)

# Test
input_string = "This is a ''sample'' string with an ''example'' that should be on the ''next'' line."
output = break_string_with_inner_words(input_string, line_length=20)
print(output)
