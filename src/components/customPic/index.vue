<template>
  <!-- <span class="headerAvatar"> -->
  <!-- <template v-if="picType === 'avatar'">
      <el-avatar v-if="userInfo.headerImg" :size="30" :src="avatar" />
      <el-avatar v-else :size="30" :src="require('@/assets/noBody.png')" />
    </template>
    <template v-if="picType === 'img'">
      <img v-if="userInfo.headerImg" :src="avatar" class="avatar" />
      <img v-else :src="require('@/assets/noBody.png')" class="avatar" />
    </template>
    <template v-if="picType === 'file'">
      <img :src="file" class="file" />
    </template> -->

  <span class="user-header user-header--teacher" v-if="this.userInfo.authorityId != '03'">
    <img :src="require('@/assets/img/user-header/teacher.svg')" alt="" />
  </span>
  <span class="user-header user-header--student" v-else>
    <img :src="require('@/assets/img/user-header/student.svg')" alt="" />
  </span>
  <!-- <img v-else :src="require('@/assets/noBody.png')" class="avatar" /> -->
  <!-- </span> -->
</template>

<script>
import { mapGetters } from 'vuex'
const path = process.env.VUE_APP_BASE_API
export default {
  name: 'CustomPic',
  props: {
    picType: {
      type: String,
      required: false,
      default: 'avatar'
    },
    picSrc: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return {
      path: path + '/'
    }
  },
  computed: {
    ...mapGetters('user', ['userInfo']),
    avatar() {
      if (this.picSrc === '') {
        if (this.userInfo.headerImg !== '' && this.userInfo.headerImg.slice(0, 4) === 'http') {
          return this.userInfo.headerImg
        }
        return this.path + this.userInfo.headerImg
      } else {
        if (this.picSrc !== '' && this.picSrc.slice(0, 4) === 'http') {
          return this.picSrc
        }
        return this.path + this.picSrc
      }
    },
    file() {
      if (this.picSrc && this.picSrc.slice(0, 4) !== 'http') {
        return this.path + this.picSrc
      }
      return this.picSrc
    }
  },
  created() {
    console.log(this.picType, 'picType')
  }
}
</script>

<style scoped lang="scss">
.headerAvatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
.file {
  width: 80px;
  height: 80px;
  position: relative;
}
.user-header {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: none;
  line-height: 30px;
  img {
    width: 20px;
    height: 20px;
    vertical-align: -5px;
  }
}

.user-header--student {
  background-image: linear-gradient(135deg, #ce9ffc 10%, #7367f0 100%);
}
.user-header--teacher {
  background-image: linear-gradient(135deg, #5efce8 10%, #736efe 100%);
}
</style>
