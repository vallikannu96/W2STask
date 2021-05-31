import re


def email_validator(value, length):
    if re.match("[A-Za-z0-9_.]+@[a-z0-9\-_]+\.[a-zA-Z]{2,}", value) and len(value) <= length:
        return True
    else:
        return False


def name_validator(value, length):
    if re.match('[A-Za-z]+', value) and len(value) <= length:
        return True
    else:
        return False


def last_name_validator(value, length):
    if re.match('[A-Za-z]([ ]?[A-Za-z]+)*', value) and len(value) <= length:
        return True
    else:
        return False


def full_name_validator(value, first, last, length):
    if value == first + ' ' + last and len(value) <= length:
        return True
    else:
        return False


def mobile_validator(value):
    if re.match('[0-9]{10}', value) and len(value) == 10:
        return True
    else:
        return False
