<template>
    <div>
        <form novalidate class="md-layout" @submit.prevent="validateForm">
            <div class="md-layout">
                <md-tabs md-dynamic-height>
                    <md-tab md-label="Conexão com o device">
                        <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                            <div class="md-layout">
                                
                                <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('Driver')">
                                        <label>Driver</label>
                                        <md-select name="Driver" id="Driver" v-model="form.Driver" md-dense :disabled="sending">
                                            <md-option value="ptl">ptl</md-option>
                                            <md-option value="s7">s7</md-option>
                                        </md-select>
                                        <span class="md-error">Driver é obrigatório</span>
                                    </md-field>
                                </div>
                            </div>

                                <div class="md-layout" v-if="form.Driver == 'ptl'">
                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('Ip')">
                                            <label>IP</label>
                                            <md-input name="Ip" id="Ip" autocomplete="IP para conexão" v-model="form.Ip" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.Ip.required">IP é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.Ip.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('Port')">
                                            <label>Porta</label>
                                            <md-input name="Port" id="Porta" autocomplete="Porta para conexão" v-model="form.Port" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.Port.required">Porta é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.Port.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('MasterDevice')">
                                            <label>Master Device</label>
                                            <md-input name="MasterDevice" id="MasterDevice" autocomplete="Master Device para conexão" v-model="form.MasterDevice" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.MasterDevice.required">Master Device é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.MasterDevice.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('TestCardCode')">
                                            <label>Test card code</label>
                                            <md-input name="TestCardCode" id="TestCardCode" autocomplete="Test card code para conexão" v-model="form.TestCardCode" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.TestCardCode.required">Test card code é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.TestCardCode.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <label>Has read gate</label>
                                        <div class="flex-column">
                                            <md-radio v-model="form.HasReadGate" :value="true">Sim</md-radio>
                                            <md-radio v-model="form.HasReadGate" :value="false">Não</md-radio>
                                        </div>
                                    </div>
                                </div>

                                <div class="md-layout" v-else>
                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('Host')">
                                            <label>Host</label>
                                            <md-input name="Ip" id="Ip" autocomplete="IP para conexão" v-model="form.Host" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.Host.required">Host é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.Host.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('Rack')">
                                            <label>Rack</label>
                                            <md-input name="Ip" id="Ip" autocomplete="IP para conexão" v-model="form.Rack" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.Rack.required">Rack é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.Rack.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>

                                    <div class="md-layout-item md-size-30 md-small-size-100 mf-1">
                                        <md-field :class="getValidationClass('Slot')">
                                            <label>Slot</label>
                                            <md-input name="Ip" id="Ip" autocomplete="IP para conexão" v-model="form.Slot" :disabled="sending" />
                                            <span class="md-error" v-if="!$v.form.Slot.required">Slot é um campo obrigatório</span>
                                            <span class="md-error" v-else-if="!$v.form.Slot.minlength">Tamanho Inválido</span>
                                        </md-field>
                                    </div>
                                </div>
                            <md-button class="md-raised md-primary" v-if="form.Driver == 's7'" @click="TestConnection">Testar conexão</md-button>
                        </div>
                    </md-tab>

                    <md-tab md-label="General">
                        <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                            <div class="md-layout">

                                <div class="md-layout-item md-size-45 md-small-size-100 mf-1">
                                    <md-field :class="getValidationClass('Name')">
                                        <label>Name</label>
                                        <md-input name="Name" id="Name" autocomplete="Test card code para conexão" v-model="form.Name" :disabled="sending" />
                                        <span class="md-error" v-if="!$v.form.Name.required">Test card code é um campo obrigatório</span>
                                        <span class="md-error" v-else-if="!$v.form.Name.minlength">Tamanho Inválido</span>
                                    </md-field>
                                </div>

                                <div class="md-layout-item md-size-100 md-small-size-100 mt-1">
                                    <md-divider></md-divider>
                                    <md-subheader>Tags</md-subheader>
                                </div>

                                <div class="md-layout-item md-size-100 md-small-size-100 ">
                                    <div class="md-layout" v-for="(Dynamic_param,index) in $v.Dynamic_params.$each.$iter" :key="index">

                                        <div class="md-layout-item md-size-20 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('Name',index)">
                                                <label>Nome</label>
                                                <md-input v-model.trim="Dynamic_param.Name.$model" autocomplete="Nome do parêmetro"/>
                                                <span class="md-error" v-if="!Dynamic_param.Name.required">Nome é um campo obrigatório</span>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-20 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('Address',index)">
                                                <label>Address</label>
                                                <md-input v-model.trim="Dynamic_param.Address.$model" autocomplete="Nome do parêmetro"/>
                                                <span class="md-error" v-if="!Dynamic_param.Address.required">Address é um campo obrigatório</span>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-10 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('Rate',index)">
                                                <label>Rate</label>
                                                <md-input v-model.trim="Dynamic_param.Rate.$model" autocomplete="Nome do parêmetro"/>
                                                <span class="md-error" v-if="!Dynamic_param.Rate.required">Rate é um campo obrigatório</span>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-20 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('Mode',index)">
                                                <label>Modo</label>
                                                <md-select v-model="Dynamic_param.Mode.$model" id="Mode">
                                                    <md-option value="FromOTM" selected>FromOTM</md-option>
                                                    <md-option value="ToOTM">ToOTM</md-option>
                                                </md-select>
                                                <span class="md-error" v-if="!Dynamic_param.Mode.required">Modo é um campo obrigatório</span>
                                            </md-field>
                                        </div>

                                        <div class="md-layout-item md-size-20 md-small-size-100">
                                            <md-field :class="getValidationDynamicParamsClass('TypeCode',index)">
                                                <label>Formato</label>
                                                <md-select  v-model="Dynamic_param.TypeCode.$model" id="TypeCode">
                                                    <md-option v-for="typeCode in TypeCodes" :key="typeCode.code" :value="typeCode.code">{{typeCode.name}}</md-option>
                                                </md-select>
                                                <span class="md-error" v-if="!Dynamic_param.TypeCode.required">Formato é um campo obrigatório</span>
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
        requiredIf,
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
                Driver: 's7',
                HasReadGate: false,
                Ip:null,
                Port:null,
                MasterDevice:null,
                TestCardCode:null,
                Tags: null,
                Host:null,
                Slot:null,
                Rack:null
            },
            Dynamic_params:[
                {
                    Name:null,
                    Address:null,
                    Rate:0,
                    Mode:"FromOTM",
                    TypeCode:18
                }
            ],
            loader: false,
            sending: false,
            connection:false,
            TypeCodes:[
                {
                    name: 'Empty',
                    code: 0
                },
                {
                    name: 'Object',
                    code: 1
                },
                {
                    name: 'DBNull',
                    code: 2
                },
                {
                    name: 'Boolean',
                    code: 3
                },
                {
                    name: 'Char',
                    code: 4
                },
                {
                    name: 'SByte',
                    code: 5
                },
                {
                    name: 'Byte',
                    code: 6
                },
                {
                    name: 'Int16',
                    code: 7
                },
                {
                    name: 'UInt16',
                    code: 8
                },
                {
                    name: 'Int32',
                    code: 9
                },
                {
                    name: 'UInt32',
                    code: 10
                },
                { 
                    name: 'Int64',
                    code: 11
                },
                {
                    name: 'UInt64',
                    code: 12
                },
                {
                    name: 'Single',
                    code: 13
                },
                {
                    name: 'Double',
                    code: 14
                },
                {
                    name: 'Decimal',
                    code: 15
                },
                {
                    name: 'DateTime',
                    code: 16
                },
                {
                    name: 'String',
                    code: 18
                }
            ]

        }),
        validations: {
            form: {
                Name: {
                    required:requiredIf(function(){
                        return this.connection == true || this.form.Driver != 's7'
                    }),
                    minLength: minLength(3)
                },
                Ip: {
                    required:requiredIf(function(){
                        return this.form.Driver == 'ptl'
                    }),
                    minLength: minLength(8)
                },
                Port: {
                    required:requiredIf(function(){
                        return this.form.Driver == 'ptl'
                    }),
                    minLength: minLength(2)
                },
                MasterDevice: {
                    required:requiredIf(function(){
                        return this.form.Driver == 'ptl'
                    }),
                    minLength: minLength(3)
                },
                TestCardCode: {
                    required:requiredIf(function(){
                        return this.form.Driver == 'ptl'
                    }),
                    minLength: minLength(2)
                },
                Host: {
                    required:requiredIf(function(){
                        return this.form.Driver == 's7'
                    }),
                    minLength: minLength(3)
                },
                Slot: {
                    required:requiredIf(function(){
                        return this.form.Driver == 's7'
                    }),
                    minLength: minLength(1)
                },
                Rack: {
                    required:requiredIf(function(){
                        return this.form.Driver == 's7'
                    }),
                    minLength: minLength(1)
                },
            },
            Dynamic_params:{
                $each: {
                    Name: {
                        required:requiredIf(function(){
                            return this.connection == true
                        }),
                        minLength: minLength(2)
                    },
                    Address:{
                        required:requiredIf(function(){
                            return this.connection == true
                        }),
                    },
                    Rate:{
                        required:requiredIf(function(){
                            return this.connection == true
                        }),
                    },
                    Mode:{
                        required:requiredIf(function(){
                            return this.connection == true
                        }),
                    },
                    TypeCode:{
                        required:requiredIf(function(){
                            return this.connection == true
                        }),
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
                    Name:null,
                    Address:null,
                    Rate:0,
                    Mode:"FromOTM",
                    TypeCode:18
                })
            },
            RemoveParam (index) {
                if(index != 0){
                    this.Dynamic_params.splice(index,1)
                }
            },
            EditProps(){
                if(this.edit){
                    let conection_string = this.edit.config.split(';');

                    this.form.Id =  this.edit.id;
                    this.form.Name =  this.edit.name;
                    this.form.Driver =  this.edit.driver;
                    if(this.form.Driver == 's7'){
                        this.form.Host = conection_string[0].split('=').pop();
                        this.form.Slot = conection_string[1].split('=').pop();
                        this.form.Rack = conection_string[2].split('=').pop();
                    }else{
                        this.form.Ip = conection_string[0].split('=').pop();
                        this.form.Port = conection_string[1].split('=').pop();
                        this.form.MasterDevice = conection_string[2].split('=').pop();
                        this.form.HasReadGate = conection_string[3].split('=').pop().toLowerCase();
                        this.form.TestCardCode = conection_string[4].split('=').pop();
                    }

                    this.Dynamic_params.pop();
                    this.edit.tags.forEach(element => {
                        let typeCode = this.TypeCodes.find(e => e.name == element.typeCode);
                        this.Dynamic_params.push({
                            Name:element.name,
                            Address:element.address,
                            Rate:element.rate,
                            Mode:element.mode,
                            TypeCode:typeCode.code
                        })
                    });

                }
            },
            TestConnection(){
                if(this.validateForm()){
                    this.Loader.showLoader = true;
                    let method = '';
                    if(this.form.Driver == 'ptl'){
                        method = "TestConnectionPtl"
                    }else{
                        method = "TestConnectionS7"
                    }

                    axios
                        .post('/api/Device/'+ method ,JSON.stringify(this.form),{
                            headers:{
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(response => {
                            this.Loader.showLoader = false;
                            if( response.data.result == true){
                                this.connection = true;
                                this.$swal({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Conectado...',
                                    timer: 3500
                                })
                            }else{
                                this.$swal({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Erro de conexão...',
                                    text: 'Falha ao se conectar!',
                                })
                            }
                        });
                }
            },
            Submit(){
                if(this.connection || this.form.Driver != 's7'){
                    if(this.validateForm()){
                        this.Loader.showLoader = true;
                        this.form.Config = "ip=" + this.form.Ip +";port=" + this.form.port +";MasterDevice="+ this.form.MasterDevice +";HasReadGate="+ this.form.HasReadGate +";TestCardCode="+this.form.TestCardCode+";";
                        this.form.Tags = this.Dynamic_params;
                        this.form.ContextName = this.$route.params.context;
    
                        axios
                            .post('/api/Device',JSON.stringify(this.form),{
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
                }else{
                    this.$swal({
                        position: 'top-end',
                        icon: 'error',
                        title: 'Erro...',
                        text: "Conexão com Device não foi estabelecida.",
                    })
                }
            },
        },
        created: function(){
            this.EditProps();
        }
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
