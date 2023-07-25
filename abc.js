def format_text(text, max_length=10):
    # Initialize variables
    lines = []
    current_line = ""

    # Split the text into words
    words = text.split()

    for word in words:
        # Check if adding the current word exceeds the max_length
        if len(current_line) + len(word) + 1 > max_length:
            # Check if the last character of the current line is a part of a word
            if current_line and not current_line[-1].isspace():
                # Move the word to the next line
                lines.append(current_line.strip())
                current_line = word + " "
            else:
                lines.append(current_line.strip())
                current_line = ""

        # Check for the presence of the inner string
        if ("''" in word or '""' in word) and word.count("''") % 2 == 1:
            # Check if the current word starts with the inner string
            if (word.startswith("''") or word.startswith('""')) and len(current_line) + len(word) > max_length:
                lines.append(current_line.strip())
                current_line = word + " "
            else:
                current_line += word + " "
        else:
            current_line += word + " "

    # Add the remaining content to the last line
    if current_line:
        lines.append(current_line.strip())

    # Join the lines back together
    formatted_text = "\n".join(lines)

    return formatted_text


text = 'hello everyone my name is abc, I came here to "one two three four" and ''sea you all'' please come here john'
formatted_text = format_text(text)
print(formatted_text)
