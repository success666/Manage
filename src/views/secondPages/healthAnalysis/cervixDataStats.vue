<template>
    <div class="detail_list">
        <h2>2017-2018学年广州市越秀区建设六马路小学二年级2班综合体质合格率</h2>
        <div class="detail_data">
            <el-table
                :data="detailListData"
                style="width: 100%">
                <el-table-column
                    align="center"
                    prop="date"
                    label="学号"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="姓名"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="性别"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="date"
                    label="成绩"
                    min-width="180">
                </el-table-column>
                <el-table-column label="操作" align="center" test="date">
                <template slot-scope="scope">
                    <el-button
                    min-width='180'
                    size="mini"
                    @click="handleEdit(scope.$index, detailListData)">查看</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="bottomC"> 
            <div class="print">
                <el-button type="primary" size="small">导出</el-button><el-button type="primary" size="small">打印</el-button>
            </div>
            <div class="data_detail_pagination">
                <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="prev, pager, next, sizes, jumper"
                :total="40">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            detailListData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                },
            ],
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleEdit(index, data) {
            this.$router.push({
                name: 'studentDetail',
                query: {
                    name: data[index].name
                }
            })
        }
    }
}
</script>
<style scoped>
.detail_data{
    height: 500px;
    overflow: auto;
    background-color: #fff
}
.detail_list{
    position: relative;
    height: 652px;
    padding: 20px 0;
    background-color: #fff
}
h2{
    line-height: 40px;
    text-align: center;
    background-color: #fff;
    margin: 0;
    padding: 39px 0 68px;
}
.bottomC{
    background-color: #fff;
    padding: 20px 0
}
.print{
    text-align: right;
    padding-right: 28px;
    margin-bottom: 20px
}
.data_detail_pagination{
    text-align: right;
    padding-right: 28px
}
</style>

