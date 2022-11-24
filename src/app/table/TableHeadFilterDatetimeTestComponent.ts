import { Component, OnInit } from '@angular/core';
import { TiTableColumns, TiTableRowData, TiTableSrcData } from '@opentiny/ng';

@Component({
    styleUrls: ['./tableTest.less'],
    templateUrl: './table-head-filter-datetime-test.html'
})
export class TableHeadFilterDatetimeTestComponent implements OnInit {
    public displayed: Array<TiTableRowData> = [];
    public srcData: TiTableSrcData;
    private data: Array<TiTableRowData> = [];
    public columns: Array<TiTableColumns> = [
        {
            title: 'first name',
            width: '20%'
        },
        {
            title: 'birthday',
            width: '20%',
            key: 'birthday',
            selected: undefined,
            panelAlign: 'left',
            isDatetime: true,
            datetimeConfig: { // 此项为可选项，此处是为了展示如何使用
                format: {
                    date: 'yyyy-MM-dd',
                    time: 'HH:mm:ss'
                }
            }
        },
        {
            title: 'hireDate',
            width: '20%',
            key: 'hireDate',
            selected: undefined,
            panelAlign: 'left',
            isDatetime: true,
            datetimeConfig: {// 此项为可选项，此处为了展示如何使用
               max: new Date(2024, 9, 13, 21, 6, 59),
               min: new Date(2020, 8, 1, 8, 30, 0)
            }
        },
        {
            title: 'start',
            width: '20%',
            key: 'start',
            selected: undefined,
            panelAlign: 'left',
            isDatetime: true,
            datetimeConfig: {
               onlyDate: true,
               format: 'yyyy-MM-dd' // 此项为可选项，此处为了展示如何使用
            }
        },
        {
            title: 'expired',
            width: '20%',
            key: 'expired',
            selected: undefined,
            isDatetime: true,
            panelAlign: 'right',
            datetimeConfig: {
               onlyDate: true,
               max: new Date(2024, 10, 31), // 此项为可选项，此处为了展示如何使用
               min: new Date(2020, 9, 1), // 此项为可选项，此处为了展示如何使用
            }
        }
    ];

    ngOnInit(): void {
        // 随机生成10条数据
        for (let j: number = 0; j < 10; j++) {
            this.data.push(this.createRandomItem(j));
        }
        this.srcData = {
            data: this.data,
            state: {
                searched: false,
                sorted: false,
                paginated: false
            }
        };
        // 设置初始化第二列的 headfilter 的选中项,start表示开始时间，end表示结束时间,start，end需传入Date类型
        this.columns[1].selected = {
            start: new Date(2021, 6, 21, 40, 23, 45),
            end: new Date(2021, 6, 22, 40, 23, 45)
        };
        // 根据初始化第二列的 headfilter 的选中项对表格筛选
        this.onSelect(this.columns[1].selected, this.columns[1]);

        // 设置初始化第四列的 headfilter 的选中项,start表示开始时间，end表示结束时间,start，end需传入Date类型
        this.columns[3].selected = {
            start: new Date(2021, 6, 21),
            end: new Date(2021, 6, 22, 23, 59, 59)
        };
        // 根据初始化第四列的 headfilter 的选中项对表格筛选
        this.onSelect(this.columns[3].selected, this.columns[3]);
    }

    /* 表格自带搜索功能不满足此种场景，此示例是在 onselect 事件中通过对表格的 srcData 进行处理实现过滤。
     *  通过select事件，获取时间日期下拉中的选中项，时间日期的选中项包括：
        {
          start：开始时间
          end: 结束时间
          type: 'datetime' 当前选中项的面板类型，方便用户进行选中面板的辨别
        }
     **/

    /**
     * @param items 当前选中项
     * @param column 表格中配置的每个列的表头信息
     */
    public onSelect(items: any, column: TiTableColumns): void {
        // 从每一行进行过滤筛选
        this.srcData.data = this.data.filter((rowData: TiTableRowData) => {
            // 遍历所有列
            for (const columnData of this.columns) {
                // 只有筛选列有选中项时进行筛选，如果某一筛选列选中项不包含当前行数据，则跳出循环
                if (columnData.isDatetime && columnData.selected) {
                    // 将时间日期转为时间戳，通过时间戳进行日期大小的比较
                    const start: number = this.isValidDate(columnData.selected.start) ? Date.parse(columnData.selected.start) : undefined;
                    const currentTime: number = this.isValidDate(new Date(rowData[columnData.key]))
                    ? Date.parse(rowData[columnData.key]) : undefined;
                    const end: number = this.isValidDate(columnData.selected.end) ? Date.parse(columnData.selected.end) : undefined;
                    let exit: boolean = true;

                    // 如果当时值不存在或者不是有效的时间日期格式，则怕排查此列，跳出循环
                    if (!currentTime) {
                        return false;
                    }

                    // 开始结束时间都存在
                    if (start && end) {
                         exit =  start <= currentTime && currentTime <= end;
                    }

                    // 开始时间存在，结束时间不存在，
                    if (start && !end) {
                        exit = start <= currentTime;
                    }

                    // 结束时间存在，开始时间不存在
                    if (!start && end) {
                        exit = currentTime <= end;
                    }

                    if (exit === false) {
                        return false;
                   }
                }
            }

            return true;
        });
    }

    private createRandomItem(id: number): TiTableRowData {
        const nameList: Array<string> = ['Pierre', 'Pol', 'Jacques', 'Robert', 'Elisa'];
        const firstName: string = nameList[(id + 3) * 19 % 5];
        // 时间日期格式列
        const birthday: string = this.timestampToTime(new Date(2021, 6, 21, 40, 23, 45).getTime() + (id * 1000 * 60 * 60 * 24));
        // 日期格式列，测试时间日期面板是否可以过滤日期格式
        const hireDate: string = this.timestampToTime(new Date(2021, 6, 21).getTime() + (id * 1000 * 60 * 60 * 24 * 100));
        const expired: string = this.timestampToTime(new Date(2021, 6, 21).getTime() + (id * 1000 * 60 * 60 * 24 * 100), true);
        const start: string = this.timestampToTime(new Date(2021, 6, 21).getTime() + (id * 1000 * 60 * 60 * 24 * 50), true);

        return {
            start,
            birthday,
            hireDate,
            expired,
            firstName,
            id
        };
    }

    // 将时间戳转换为时间格式，此处的函数是为了创建表格中的随机时间,服务可自行设置自己的时间
    public timestampToTime(timestamp: number, isDateFormat?: boolean): string {
        const date: Date = new Date(timestamp); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000

        const Y: string = date.getFullYear() + '-';

        const M: string = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';

        const D: string = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';

        const h: string = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';

        const m: string = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';

        const s: string | number = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

        // 返回日期格式
        if (isDateFormat) {
            return Y + M + D;
        }

        // 返回时间日期格式
        return Y + M + D + h + m + s;
      }

      // 判断当前值是否日期格式
      public isValidDate(dateTemp: Date | string): boolean {
        let date: Date | string = dateTemp;
        if (Object.prototype.toString.call(date) === '[object String]') {
            // 转为时间格式
            date = new Date(dateTemp);
        }

        return Object.prototype.toString.call(date) === '[object Date]' && String(date) !== 'Invalid Date';
    }
}