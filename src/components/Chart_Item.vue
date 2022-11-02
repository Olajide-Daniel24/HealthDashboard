<template>

   <div class="chart_container">

   </div>

</template>

<script>

    //import highcharts and other necessary modules
    import Highcharts from 'highcharts'
    import {collection, getDocs} from 'firebase/firestore'
    import {db} from './firebase'
    //import offline from 'v-offline';

    
    
    export default {

        name: 'Chart_Item', 
       

        data(){
            return {
                
                categories: ['A', 'B', 'AB', 'O'],
                dbData: [],
                dbFetched: false,
                
                series: [
                        {
                            "id": 1,
                            "name": '1-10',
                            "data": [0,0,1,0]
                        }, 
                        {
                            "id": 2,
                            "name": '11-20',
                            "data": [0,0,0,0]
                        }, 
                        {
                            "id": 3,
                            "name": '21-30',
                            "data": [0,0,0,0]
                        }, 
                        {
                            "id": 4,
                            "name": '31-40',
                            "data": [0,0,0,0]
                        }
                ]
                
            }
        }, 

        async beforeMount(){
                let storedValue = null
                let flag = false
                try{
                     storedValue = this.getStoredOfflineValue()
                    if (storedValue !=null) flag = true
                }
                catch(e){
                    return
                }
                
                
                if( flag ){
               
                this.dbData = [...storedValue]
                }
                else  {
                    
                    const collectionRef = collection(db, 'data');
                    let dataFetched = null
                    await getDocs(collectionRef)
                    .then((response)=>{
                        dataFetched = response.docs.map((item)=>{
                        return item.data()
                    })
                })

                
                //store the fetched data in state.
                this.dbData = [...dataFetched]

                this.dbFetched = true
                this.storeValueOffline()
                }
                
                await this.sortOutDbData()
                await this.drawGraph()
        },

      
        
        methods: {
           
           //take the fetched data and create data elements representing the 
           //number of occurence of each blood Group 
           sortOutDbData(){

                //template = [A,B,AB,O]
                let storage_1_10 = [0,0,0,0]
                let storage_11_20 = [0,0,0,0]
                let storage_21_30 = [0,0,0,0]
                let storage_31_40 = [0,0,0,0]

              
              this.dbData.forEach((item)=>{
                
                //check the range the age falls into
                if(item.age <=10){
                    switch(item.bloodGroup){
                        case 'A':
                        storage_1_10[0] = storage_1_10[0]+1; 
                        break;

                        case 'B':
                        storage_1_10[1] = storage_1_10[1]+1; 
                        break;


                        case 'AB':
                        storage_1_10[2] = storage_1_10[2]+1; 
                        break;

                            

                        case'O':
                        storage_1_10[3] = storage_1_10[3]+1; 
                        break;

                    }
                }

                else if( item.age>10 && item.age<=20){
                    switch(item.bloodGroup){
                        case 'A':
                        storage_11_20[0] = storage_11_20[0]+1; 
                        break;

                        case 'B':
                        storage_11_20[1] = storage_11_20[1]+1; 
                        break;

                        case 'AB':
                        storage_11_20[2] = storage_11_20[2]+1; 
                        break;

                        case'O':
                        storage_11_20[3] = storage_11_20[3]+1; 
                        break;
                    }
                }

                else if( item.age>20 && item.age<=30){
                    switch(item.bloodGroup){
                        case 'A':
                        storage_21_30[0] = storage_21_30[0]+1; 
                        break;

                        case 'B':
                        storage_21_30[1] = storage_21_30[1]+1; 
                        break;

                        case 'AB':
                        storage_21_30[2] = storage_21_30[2]+1; 
                        break;

                        case'O':
                        storage_21_30[3] = storage_21_30[3]+1; 
                        break;
                    }
                }

                else if( item.age>30 && item.age<=40){
                    switch(item.bloodGroup){
                        case 'A':
                        storage_31_40[0] = storage_31_40[0]+1; 
                        break;

                        case 'B':
                        storage_31_40[1] = storage_31_40[1]+1; 
                        break;

                        case 'AB':
                        storage_31_40[2] = storage_31_40[2]+1; 
                        break;

                        case'O':
                        storage_31_40[3] = storage_31_40[3]+1; 
                        break;
                    }
                }
              })

                //set state equal to the processed data
                
                this.series.forEach((item)=>{
                    item.data = [] 
                })

                this.series.forEach((item, index)=>{
                    
                    if(index == 0) this.series[0].data =storage_1_10.slice()
                    else if(index == 1) this.series[1].data = storage_11_20.slice()
                    else if(index == 2) this.series[2].data = storage_21_30.slice()
                    else if(index == 3) this.series[3].data = storage_31_40.slice()
                })

                
           
            }, 

            drawGraph(){
                
                //this function calls the Highcharts library to draw the bar chart
               const promise1 = new Promise((resolve, reject) => {
                    console.log(reject)
                    resolve('Success!');
                });
                
                promise1.then(()=>{
                    Highcharts.chart('app', {

                    chart: {
                        type: "bar"
                    },
                    credits: { 
                        enabled: false 
                    },

                    title: {
                        text: "Health Records Summary"
                    },

                    yAxis: {
                        title: {
                            text: "Number of Persons"
                        }
                    },

                    xAxis: {
                        title: {
                            text: "Blood Group"
                        },
                        categories: ['A', 'B', 'AB', 'O']
                    },

                    series: [...this.series]
                    })

                })
               
            }, 

           
            //functions to aid working offline

            storeValueOffline(){
                
                
                if(this.dbFetched == true&& (this.dbData.length>0))
                {
                    localStorage.setItem("dbData", JSON.stringify(this.dbData))
                    this.dbFetched = true
                
                }
                
            },

            getStoredOfflineValue(){
                //get the series value stored locally
                return(JSON.parse(localStorage.getItem("dbData")))
                
            }

          
        }
    }
    
</script>

<style>


</style>