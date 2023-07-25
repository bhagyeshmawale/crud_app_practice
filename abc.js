def format_text(text, max_length=10):
    # Initialize variables
    lines = []
    current_line = ""
    current_word = ""
    in_inner_string = False

    # Split the text into words
    words = text.split()

    for word in words:
        # Check if the word is an inner string starting and ending with ''
        if word.startswith("''") and word.endswith("''"):
            in_inner_string = True

        if in_inner_string:
            current_line += word + " "
            if len(current_line) > max_length:
                # Move entire inner string to the next line
                lines.append(current_line.strip())
                current_line = ""
                in_inner_string = False
        else:
            if len(current_line) + len(word) + 1 <= max_length:
                # Add word to the current line
                current_line += word + " "
            else:
                # Check if there is a word in the middle of the line
                if current_word and len(current_line) + len(current_word) + 1 <= max_length:
                    current_line += current_word + " "
                    current_word = ""

                # Add the current line to the list of lines
                lines.append(current_line.strip())

                # Reset the current line to the current word
                current_line = word + " "

        current_word = word

    # Add the remaining content to the last line
    if current_line:
        lines.append(current_line.strip())

    # Join the lines back together
    formatted_text = "\n".join(lines)

    return formatted_text


text = "hello everyone my name is abc, I came here to ''sea you all'' please come here"
formatted_text = format_text(text)
print(formatted_text)
