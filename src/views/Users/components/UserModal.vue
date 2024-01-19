<template>
  <el-dialog v-model="visible" :show-close="false" @close="emit('close-modal')">
    <template #header="{titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
      </div>
    </template>
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      status-icon
      label-width="200px"
      :model="userForm">
      <el-form-item label="Имя пользователя">
        <el-input v-model="userForm.name" placeholder="Введите имя пользователя" clearable />
      </el-form-item>
      <el-form-item label="Имя учетной записи">
        <el-input v-model="userForm.login" placeholder="Введите имя учетной записи" clearable />
      </el-form-item>
      <el-form-item label="Пароль" prop="password" >
        <el-input v-model="userForm.password" type="password" autocomplete="off" placeholder="Введите пароль" clearable />
      </el-form-item>
      <el-form-item label="Подтверждение пароля" prop="password_confirm">
        <el-input v-model="userForm.password_confirm" type="password" placeholder="Повторите пароль" autocomplete="off" clearable />
      </el-form-item>
      <el-form-item label="Роль">
        <el-select
          v-model="userForm.role"
          placeholder="Укажите роль пользователя"
          clearable
        >
          <el-option label="Пользователь" value="shanghai" />
          <el-option label="Админ" value="beijing" />
        </el-select>
      </el-form-item>
      <div>
        <el-form-item>
          <el-button type="primary" @click="createUser">Query</el-button>
        </el-form-item>
          <el-button type="danger" @click="emit('close-modal')">Query</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, reactive } from 'vue';
import { LocationQueryValue } from 'vue-router';
import { userForm } from "../interfaces/userInterfaces"
import type { FormInstance, FormRules } from 'element-plus'
import { getUserData, addUser, updateUser } from "@/api/users/UserApi"

const props = defineProps(['userData', 'visible'])
const ruleFormRef = ref<FormInstance>()

const visible = ref <Boolean>(false)
const userForm = ref <userForm>({
  name: "",
  login: "",
  password: "",
  password_confirm: "",
  role: null
})

const emit = defineEmits(['close-modal'])

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Введите пароль'))
  } else {
    if (userForm.value.password !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('password', () => null)
    }
    callback()
  }
}

const validatePasswordRetry = (rule: any, value: any, callback: any) => {
  console.log('here', value)
  if (value === '') {
    callback(new Error('Подтвердите введенный пароль'))
  }
  else if (value !== userForm.value.password_confirm) {
    console.log(444);
    callback(new Error("Пароли не совпадают"))
  } else {
    callback()
  }
}

const validateNotEmptyInput = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Поле обязательно к заполнению'))
  }else {
    callback()
  }
}

const rules = reactive<FormRules<typeof userForm>>({
  name: [{ validator: validateNotEmptyInput, trigger: 'blur' }],
  login: [{ validator: validateNotEmptyInput, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
  password_confirm: [{ validator: validatePasswordRetry, trigger: 'blur' }],
  role: [{ validator: validateNotEmptyInput, trigger: 'blur' }],
})

function createUser(){

}

watch(
  () =>  props.visible,
  async openModal => {
    visible.value = props.visible
    userForm.value = props.userData
  }
)

</script>

<style>
  .modal-btn-line{
    display: flex;
    flex-direction: row;
  }
</style>