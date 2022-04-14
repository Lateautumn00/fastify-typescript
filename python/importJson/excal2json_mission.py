import xlrd
import os
import sys
import json

current_path = "..\\file\\current\\shop"
target_path = "..\\file\\target\\shop"


def read_xls(filename):

    # 打开Excel文件
    data = xlrd.open_workbook(filename)

    # 所有工作表名
    tables = data.sheet_names()
    for i in range(0, len(tables)):

        result = []
        # 表名
        name = tables[i]

        # 表内容
        table = data.sheets()[i]
        # 当前表的第二行，来获取所有key
        column = table.row_values(1)
        keys = []
        for j in range(0, len(column)):
            key = column[j].split(':')[1]
            keys.append(key)
        # 当前表所有行
        rows = table.nrows

        # 从第三行开始读取数据
        for k in range(2, rows):
            # 用来存放每行数据
            value = {}
            # 每行数据的值
            values = table.row_values(k)
            # 从第二列开始遍历所有值
            for h in range(0, len(values)):
                # 将当前列值保存到对应key上
                if(isinstance(values[h], float)):
                    value[keys[h]] = int(values[h])
                else:
                    value[keys[h]] = values[h]
            result.append(value)
        writeFile(name, json.dumps(result, ensure_ascii=False))


def writeFile(filename, result):
    file = open(target_path + "\\" + filename + ".json", "w", encoding='utf-8')
    file.write(result)
    file.close()


# 遍历文件夹
def walkFile(path):
    # root 表示当前正在访问的文件夹路径
    # dirs 表示该文件夹下的子目录名list
    # files 表示该文件夹下的文件list
    for root, dirs, files in os.walk(path):
        # 遍历文件
        for f in files:
            read_xls(os.path.join(root, f))


if __name__ == '__main__':
    walkFile(current_path)
