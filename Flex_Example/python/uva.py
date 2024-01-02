from pyscript import document as dom

def uva490(event=''):
    temp = dom.getElementById('uva490_input').value
    str1, str2 = list(map(str, temp.split()))
    longlen = max(len(str1), len(str2))
    n = 0

    output = ['x', 'y']
    
    temp = ''
    for n in range(longlen) :
        if n < len(str1): output[0] = str1[n]
        else: output[0] = ' '

        if n < len(str2): output[1] = str2[n]
        else: output[1] = ' '

        temp += f'{output[1]} {output[0]}' + '\n'
    dom.getElementById('uva490_output').innerText = temp



def uva10260(event=''):
    ind = ['#', 'BFPV', 'CGJKQSXZ', 'DT', 'L', 'MN', 'R']
    dit = {}

    for string in ind:
        for chr in string:
            dit[chr] = str(ind.index(string))


        line = dom.getElementById('uva10260_input').value.upper()

        string = ''
        visit  = ''

        for chr in line:
            if chr in dit:
                if (visit in dit) and (dit[chr] == dit[visit]):
                    continue

                string += dit[chr]
            visit = chr
            dom.getElementById('uva10260_output').innerText = string
