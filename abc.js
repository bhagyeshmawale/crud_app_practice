def wrap_text(text, max_length=25):
    words = text.split()
    lines = []
    current_line = ""
    
    for word in words:
        if len(current_line) + len(word) + 1 <= max_length:  # +1 accounts for the space between words
            current_line += " " + word
        else:
            lines.append(current_line.strip())
            current_line = word

    if current_line:
        lines.append(current_line.strip())

    wrapped_text = "\n".join(lines)

    # Handle the case where inner strings in ''abc pqr '' are in the middle of a line
    wrapped_text = wrapped_text.replace("''", "\n''")

    return wrapped_text

text = "hello everyone my name is abc, I came here to ''sea you all'' please come here"
result = wrap_text(text)
print(result)
