<template>
  <div>
    <el-backtop target=".demo-form-inline"></el-backtop>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Up主页名示例列表">
        <el-select
          v-model="formInline.ups"
          placeholder="膜法世家官方账号"
          :disabled="formInline.user ? true : false"
        >
          <el-option label="膜法世家官方账号" value="276861076"></el-option>
          <el-option label="完美日记" value="352049471"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="需要新增列表里的Up主页名和对应的uid">
        <el-input
          v-model="formInline.user"
          placeholder="膜法世家官方账号/276861076"
          :disabled="formInline.ups ? true : false"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          v-if="!formInline.user"
          icon="el-icon-search"
        >
          查询
        </el-button>
        <el-button type="primary" @click="onCreate" v-else>
          新增
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%; left: 0; right: 0; margin: 0 auto;"
      v-loading="loading"
    >
      <el-table-column
        fixed
        prop="created"
        label="发布时间"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="length"
        label="视频时长"
        width="80"
      ></el-table-column>
      <el-table-column prop="play" label="播放量" width="80"></el-table-column>
      <el-table-column
        prop="comment"
        label="评论数"
        width="80"
      ></el-table-column>
      <el-table-column prop="title" label="标题" width="250"></el-table-column>
      <el-table-column prop="pic" label="封面图片" width="180">
        <template slot-scope="scope">
          <el-image
            style="width: 160px; height: 100px"
            :src="scope.row.pic"
            fit="cover"
            @click="fangda($event)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="bvid" label="视频地址" width="250">
        <template slot-scope="scope">
          <a :href="scope.row.bvid">{{ scope.row.bvid }}</a>
        </template>
      </el-table-column>
      <el-table-column prop="view" label="播放數" width="120"></el-table-column>
      <el-table-column
        prop="danmaku"
        label="彈幕數"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="reply"
        label="評論數量"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="favorite"
        label="收藏數"
        width="120"
      ></el-table-column>
      <el-table-column prop="coin" label="投幣數" width="120"></el-table-column>
      <el-table-column
        prop="share"
        label="分享數"
        width="120"
      ></el-table-column>
      <el-table-column prop="like" label="點贊數" width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script>
function dateFormat(time) {
  const year = new Date(time).getFullYear();
  let month = new Date(time).getMonth() + 1;
  let day = new Date(time).getDate();
  return `${year}/${month}/${day}`;
}
import { dataList } from '@/utils/data';
import api from '@/api/index';
import qs from 'qs';
const query = qs.parse(window.location.search.slice(1));
export default {
  data() {
    return {
      formInline: {
        user: '',
        ups: ''
      },
      loading: false,
      sortKey: '',
      tableData: dataList.slice(0, 10),
      status: ''
    };
  },
  methods: {
    onSubmit() {
      this.$alert(
        '获取数据的时间与视频数目有直接关系，可能会花费你1~5分钟不等，如果确定查询的话请耐心等待...',
        '确定进行查询操作吗？',
        {
          confirmButtonText: '确定',
          callback: async action => {
            this.loading = true;
            if (action === 'confirm') {
              if (query.mock) {
                this.tableData = dataList;
                this.loading = false;
                return;
              }
              const params = { mid: this.formInline.ups, pn: 1, ps: 100 };
              let [err, res] = await this.handleApi(api.getInfo(params));
              if (!err) {
                console.log(res);
                this.tableData = res.data.data.list.vlist.map(item => {
                  let {
                    comment,
                    play,
                    title,
                    created,
                    length,
                    pic,
                    aid,
                    bvid
                  } = item;
                  created = dateFormat(Number(`${created}000`));
                  bvid = `https://www.bilibili.com/video/${bvid}`;
                  this.loading = false;
                  return {
                    created,
                    length,
                    play,
                    comment,
                    title,
                    pic,
                    aid,
                    bvid
                  };
                });
              }
            }
          }
        }
      );
    },
    fangda(e) {
      const el = e.target;
      if (this.status !== 'big') {
        el.className += ' big';
        this.$nextTick(() => {
          this.status = 'big';
        });
      } else {
        el.className.replace('big', '');
        this.status = '';
      }
    },
    onCreate() {
      console.log('onCreate');
    },
    handleApi(promise) {
      return promise
        .then(res => {
          return [null, res];
        })
        .catch(err => {
          return [err, null];
        });
    },
    prev() {
      console.log('pre');
    },
    next() {
      console.log('next');
    }
  }
};
</script>

<style lang="scss" scoped>
.big {
  height: 100vh;
  position: fixed;
  top: 0;
}
</style>
