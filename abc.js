def format_text(input_text, max_line_length):
    lines = []
    current_line = ""

    while input_text:
        start_quote = input_text.find("''")
        end_quote = input_text.find("''", start_quote + 2)
        if start_quote == -1 or end_quote == -1:
            lines.append(input_text)
            break

        if len(current_line) + end_quote + 2 <= max_line_length:
            current_line += input_text[:end_quote + 2]
            input_text = input_text[end_quote + 2:]
        else:
            lines.append(current_line)
            current_line = ""
    
    if current_line:
        lines.append(current_line)

    return "\n".join(lines)

# Example usage:
input_text = "where fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 fiscalweekofday=''sunday and monday'' and count=0 "
max_line_length = 50
formatted_text = format_text(input_text, max_line_length)
print(formatted_text)
