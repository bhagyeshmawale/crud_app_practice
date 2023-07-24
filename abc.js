def process_text(text, max_length=25):
    words = text.split()
    lines = []
    current_line = ""

    for word in words:
        if len(current_line) + len(word) + 1 <= max_length:
            if current_line:
                current_line += " "
            current_line += word
        else:
            if "''" in current_line:
                current_line = current_line.replace("''", "\n''")
            lines.append(current_line)
            current_line = word

    if current_line:
        lines.append(current_line)

    processed_text = "\n".join(lines)
    return processed_text.strip()


text = "hello everyone my name is abc, I came here to ''sea you all'' please come here"
processed_text = process_text(text, max_length=25)
print(processed_text)
