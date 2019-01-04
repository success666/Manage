export const JURISDICTION = [
    { id: 1, name: '教育部' },
    { id: 2, name: '省级' },
    { id: 3, name: '市级' },
    { id: 4, name: '区级' }
];
export const TESTITEMLEVEL1 = [
    { value: 0, id: 0, label: "合格" },
    { value: 5, id: 5, label: "优良" },
    { value: 1, id: 1, label: "优秀" },
    { value: 2, id: 2, label: "良好" },
    { value: 3, id: 3, label: "及格" },
    { value: 4, id: 4, label: "不及格" }
];
export const TESTITEMLEVEL = [
    { value: 0, id: 0, label: "合格" },
    { value: 1, id: 1, label: "优秀" },
    { value: 2, id: 2, label: "良好" },
    { value: 3, id: 3, label: "及格" },
    { value: 4, id: 4, label: "不及格" }
];
export const BODYMASSINDEXLEVEL = [
    { value: 5, id: 5, label: "正常" },
    { value: 7, id: 7, label: "低体重" },
    { value: 8, id: 8, label: "超重" },
    { value: 9, id: 9, label: "肥胖" }
];
export const FIFTYMETERRUNLEVEL = [
    { value: 0, id: 0, label: "合格" },
    { value: 1, id: 1, label: "优秀" },
    { value: 2, id: 2, label: "良好" },
    { value: 3, id: 3, label: "及格" },
    { value: 4, id: 4, label: "不及格" }
];
export const EYEEYES = [
    { value: 10, id: 10, label: "视力正常" },
    { value: 11, id: 11, label: "轻度近视" },
    { value: 12, id: 12, label: "中度近视" },
    { value: 13, id: 13, label: "重度近视" }
]
export const TORSOTILT = [
    { value: 14, id: 14, label: "阴性" },
    { value: 15, id: 15, label: "阳性" },
    { value: 16, id: 16, label: "强阳性" }
]
export const GETYEARLIST = {
    getYear: function() {
        let date = new Date();
        let nowYear = date.getFullYear();
        let yearList = [];
        let month = date.getMonth() + 1;
        let day = date.getDate();
        for (let i = nowYear; i > nowYear - 20; i--) {
            let itemObj = {};
            if (month > 8 && day > 1) {
                itemObj = {
                    value: `${i}-${i+1}`,
                    id: i
                }
            } else {
                itemObj = {
                    value: `${i-1}-${i}`,
                    id: i
                }
            }
            //const yearItem = `${i}-${i-1}`;
            yearList.push(itemObj);
        }
        return yearList;
    }
}