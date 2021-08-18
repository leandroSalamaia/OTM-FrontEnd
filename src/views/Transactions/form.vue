<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateForm">
            <div class="md-layout">
                <md-tabs md-dynamic-height>
                    <md-tab md-label="Conexão com o banco de dados">
                        <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                            <div class="md-layout">
                                
                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('Name')">
                                        <label>Nome</label>
                                        <md-input name="Name" id="Name" autocomplete="Name para conexão" v-model="form.Name" :disabled="sending" />
                                        <span class="md-error" v-if="!$v.form.Name.required">Name é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.Name.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('DataPointName')">
                                        <label>Data Point Name</label>
                                        <md-select name="DataPointName" id="DataPointNamea" autocomplete="Data Point Name para conexão" v-model="form.DataPointName" :disabled="sending">
                                            <md-option v-for="dataPoint in dataPoints" :key="dataPoint.id" :value="dataPoint.name">{{dataPoint.name}}</md-option>
                                        </md-select>
                                        <span class="md-error" v-if="!$v.form.DataPointName.required">Data Point Name é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.DataPointName.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('DeviceName')">
                                        <label>Device Name</label>
                                        <md-select name="DeviceName" id="DeviceName" autocomplete="Device Name para conexão" v-model="form.DeviceName" :disabled="sending">
                                            <md-option v-for="device in devices" :key="device.id" :value="device.name">{{device.name}}</md-option>
                                        </md-select>
                                        <span class="md-error" v-if="!$v.form.DeviceName.required">Device Name é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.DeviceName.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('TriggerType')">
                                        <label>Trigger Type</label>
                                        <md-select name="TriggerType" id="TriggerType" autocomplete="Trigger Type para conexão" v-model="form.TriggerType" :disabled="sending">
                                            <md-option value="1">On Tag Change</md-option>
                                            <md-option value="2">On Cycle</md-option>
                                        </md-select>
                                        <span class="md-error" v-if="!$v.form.TriggerType.required">Trigger Type é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.TriggerType.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('TriggerTagName')">
                                        <label>Trigger Tag Name</label>
                                        <md-input name="TriggerTagName" id="TriggerTagName" autocomplete="Trigger Tag Name para conexão" v-model="form.TriggerTagName" :disabled="sending" />
                                        <span class="md-error" v-if="!$v.form.TriggerTagName.required">Trigger Tag Name é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.TriggerTagName.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>
                            </div>
                        </div>
                    </md-tab>

                    <md-tab md-label="General">
                        <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                            <div class="md-layout">

                                <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                                    <md-divider></md-divider>
                                    <md-subheader>Binds</md-subheader>
                                </div>

                                <div class="md-layout-item md-size-100 md-small-size-100 ">
                                    <div class="md-layout" v-for="(Dynamic_param,index) in $v.Dynamic_params.$each.$iter" :key="index">

                                        <div class="md-layout-item md-size-30 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('Name',index)">
                                                <label>Data Point Param</label>
                                                <md-input v-model.trim="Dynamic_param.DataPointParam.$model" autocomplete="Data Point Param do parêmetro"/>
                                                <span class="md-error" v-if="!Dynamic_param.DataPointParam.required">Data Point Param é um campo obrigatório</span>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-30 md-small-size-100">
                                            <md-field>
                                                <label>Value</label>
                                                <md-input v-model.trim="Dynamic_param.Value.$model" autocomplete="Nome do parêmetro"/>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-30 md-small-size-100">
                                            <md-field>
                                                <label>Device Tag</label>
                                                <md-input v-model.trim="Dynamic_param.DeviceTag.$model" autocomplete="Device Tag do parêmetro"/>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-10 md-small-size-100 mt-1">
                                            <md-button class="md-raised md-accent" id="remove_param" @click="RemoveParam(index)"><md-icon>remove</md-icon></md-button>                                              
                                        </div>                                   
                                    </div>
                                    <dynamicButton color="color-green" icon="add" format="md-raised" v-on:click.native="addParam"/>
                                </div>
                            </div>
                        </div>
                    </md-tab>
                </md-tabs>

            </div>
        </form>
    </div>
</template>

<script>
    import { validationMixin } from 'vuelidate';
    import axios from 'axios';
    import {
        required,
        minLength
    } from 'vuelidate/lib/validators';
    import { dynamicButton } from "@/components";
    import "vue-select/dist/vue-select.css";

    export default {
        mixins: [validationMixin],
        components: {
            dynamicButton
        },
        props: ['edit'],       
        data: () => ({
            form: {
                Name: null,
                DataPointName: null,
                DeviceName: null,
                TriggerType:null,
                TriggerTagName:null,
                Binds:null,
            },
            Dynamic_params:[
                {
                    DataPointParam:null,
                    Value:null,
                    DeviceTag:null
                }
            ],
            loader: false,
            sending: false,
            dataPoints:[],
            devices:[]
        }),
        validations: {
            form: {
                Name: {
                    required,
                    minLength: minLength(3)
                },
                DataPointName: {
                    required,
                    minLength: minLength(8)
                },
                DeviceName: {
                    required,
                    minLength: minLength(2)
                },
                TriggerType: {
                    required,
                    minLength: minLength(3)
                },
                TriggerTagName: {
                    required,
                    minLength: minLength(2)
                }
            },
            Dynamic_params:{
                $each: {
                    DataPointParam: {
                        required,
                        minLength: minLength(2)
                    },
                    Value: {
                        minLength: minLength(2)
                    },
                    DeviceTag: {
                        minLength: minLength(2)
                    }
                },
            }

        },
        methods: { 
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            getValidationDynamicParamsClass(fieldName,index) {
                const field = this.$v.Dynamic_params.$each.$iter[index][fieldName]

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    }
                }
            },
            validateForm() {
                this.$v.$touch()

                if (!this.$v.$invalid) {
                    return true;
                }
            },
            addParam () {
                this.Dynamic_params.push({
                    DataPointParam:null,
                    Value:null,
                    DeviceTag:null
                })
            },
            RemoveParam (index) {
                if(index != 0){
                    this.Dynamic_params.splice(index,1)
                }
            },
            EditProps(){
                if(this.edit){
                    this.form.Id = this.edit.id;
                    this.form.Name =  this.edit.name;
                    this.form.DataPointName =  this.edit.dataPointName;
                    this.form.DeviceName =  this.edit.deviceName;
                    this.form.TriggerType =  this.edit.triggerType;
                    this.form.TriggerTagName =  this.edit.triggerTagName;

                    this.Dynamic_params.pop();
                    this.edit.binds.forEach(element => {
                        this.Dynamic_params.push({
                            DataPointParam:element.dataPointParam,
                            Value:element.value,
                            DeviceTag:element.deviceTag
                        })
                    });

                }
            },
            getData(){
                axios
                    .post('/api/Transaction/GetData',{ContextName:this.$route.params.context},{
                        headers:{
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {
                        this.dataPoints = response.data.dataPoints;
                        this.devices = response.data.devices           
                    });
            },
            Submit(){
                if(this.validateForm){
                    this.Loader.showLoader = true;
                    this.form.Binds = this.Dynamic_params;
                    this.form.ContextName = this.$route.params.context

                    axios
                        .post('/api/Transaction',JSON.stringify(this.form),{
                            headers:{
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(response => {
                            this.Loader.showLoader = false;
                            if(response.data.result){
                                this.$swal({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Sucesso...',
                                    text: "Cadastrado com sucesso.",
                                    willClose: () => {
                                        location.reload();
                                    }
                                })
                            }else{
                                this.$swal({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Erro...',
                                    text: "Falha ao cadastrar device.",
                                })
                            }                           
                        });
                }
            },
        },
        created: function(){
            this.EditProps();
            this.getData();
        },
        watch: {
            '$route.params.context': function (){
                this.getData();
            }
        },
    }
</script>

<style scoped>
    .md-layout-item {
        padding-left: 15px;
        padding-right: 15px;
    }

    .mt-1 {
        margin-top: 15px;
    }

    .mt-2 {
        margin-top: 30px;
    }

    .mf-1 {
        margin-left: 15px;
    }

    .style-choser{
        height: 35px !important;
    }
</style>
