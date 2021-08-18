<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary" md-elevation="0">
                <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">OTM</span>
                <img :src="img_loader" />
            </md-app-toolbar>

            <md-app-drawer :md-active.sync="menuVisible" md-persistent="mini">
                <md-toolbar class="md-transparent" md-elevation="0">
                    <span>Menu</span>

                    <div class="md-toolbar-section-end">
                        <md-button class="md-icon-button md-dense" @click="toggleMenu">
                            <md-icon>keyboard_arrow_left</md-icon>
                        </md-button>
                    </div>
                </md-toolbar>

                <md-list>
                    <router-link :to="{ name: 'context'}">
                        <md-list-item>
                            <md-icon><font-awesome-icon icon="plus-circle" /></md-icon>
                            <span class="md-list-item-text">Context</span>
                        </md-list-item>
                    </router-link>
                </md-list>

                <md-list :md-expand-single="expandSingle" v-for="context in contexts" :key="context.name">
                    <md-list-item md-expand>
                        <md-icon><font-awesome-icon icon="list" /></md-icon>
                        <span class="md-list-item-text">{{context.name}}</span>
                        
                        <md-list slot="md-expand">
                            <md-list :md-expand-single="expandSingle" class="md-sublist-item">
                                <md-list-item md-expand>
                                    <md-icon><font-awesome-icon icon="code" /></md-icon>
                                    <span class="md-list-item-text">Data Point</span>

                                    <md-list slot="md-expand">
                                        <router-link :to="{ name: 'dataPoint', params: { context: context.name }}" >
                                            <md-list-item class="md-inset">
                                                <md-icon><font-awesome-icon icon="file-code" /></md-icon>
                                                <span class="md-list-item-text">Data Points</span>
                                            </md-list-item>
                                        </router-link>
                                        <!-- <md-list-item class="md-inset" href="#/executeDatapoint">
                                            <md-icon><font-awesome-icon icon="terminal" /></md-icon>
                                            <span class="md-list-item-text">Executar</span>
                                        </md-list-item> -->
                                    </md-list>
                                </md-list-item>

                                <md-list-item md-expand>
                                    <md-icon><font-awesome-icon icon="server" /></md-icon>
                                    <span class="md-list-item-text">Device</span>
                                    
                                    <md-list slot="md-expand">
                                        <router-link :to="{ name: 'devices', params: { context: context.name }}" >
                                                <md-list-item class="md-inset">
                                                    <md-icon><font-awesome-icon icon="align-justify" /></md-icon>
                                                    <span class="md-list-item-text">Devices</span>
                                                </md-list-item>
                                        </router-link>
                                    </md-list>
                                </md-list-item>

                                <md-list-item md-expand>
                                    <md-icon><font-awesome-icon icon="exchange-alt" /></md-icon>
                                    <span class="md-list-item-text">Transaction</span>
                                    
                                    <md-list slot="md-expand">
                                        <router-link :to="{ name: 'transactions', params: { context: context.name }}" >
                                                <md-list-item class="md-inset">
                                                    <md-icon><font-awesome-icon icon="sync-alt" /></md-icon>
                                                    <span class="md-list-item-text">Transactions</span>
                                                </md-list-item>
                                        </router-link>
                                    </md-list>
                                </md-list-item>

                            </md-list>
                        </md-list>
                    </md-list-item>
                </md-list>



            </md-app-drawer>

            <md-app-content>
                <slot name="content"/>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: 'PersistentMini',
        data: () => ({
            menuVisible: false,
            expandSingle: false,
            img_loader: require('@/assets/logoAguia.png'),
            contexts:[]
        }),
        methods: {
            toggleMenu() {
                this.menuVisible = !this.menuVisible
            },
            getContext(){ 
                this.Loader.showLoader = true;
                axios
                    .get('/api/Context')
                    .then(response => {
                        this.Loader.showLoader = false;
                        this.contexts = response.data
                    })
            }
        },
        mounted() {
            this.getContext();            
        }
    }
</script>

<style scoped>
    .md-app {
        min-height: 100vh;
        border: 1px solid rgba(#000, .12);
    }

    .md-drawer {
        width: 230px;
        max-width: calc(100vw - 125px);
    }

    .md-app-toolbar{
        background-color: #0e316b !important;
    }

    .md-sublist-item > .md-list-item-content{
       padding-left: 64px !important;
    }
    
</style>