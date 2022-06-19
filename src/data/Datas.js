import React from "react";
import {popularVillas,getBanners,discountedVillas,economicVillas} from "../services/homeService"
import {search  , doSearch} from "../services/searchService"
import {villa} from "../services/villaService"

class Datas extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            popularVillas:[],
            bannersVillage:[],
            bannersvillas:[],
            bannersbigBanners:[],
            discountedVillas:[],
            economicVillas:[],
            searchPageVillas:[],
            lastPageOfSearchPage:0,
            resultVilla:[],
            totalVillas:'',

            resultSearchPageVillas:[],
            data:'',
            SearchResultWaitingHandle:true,
        }
    }

   componentDidMount() {

       {  popularVillas()
           .then(res => {
               const popularVillas = res.data.data;
               this.setState({ popularVillas });
           })
           .catch(function (error) {
               console.log('error')
           })  }

       {  getBanners()
           .then(res => {
               const bannersVillage = res.data.villages;
               const bannersvillas = res.data.villas;
               const bannersbigBanners = res.data.bigBanners;
               console.log('res.data.bigBanners',res.data.bigBanners);
               this.setState({ bannersvillas , bannersbigBanners, bannersVillage});
           })
           .catch(function (error) {
               console.log('error')
           })  }

       {  discountedVillas()
           .then(res => {
               const discountedVillas = res.data.data;
               this.setState({ discountedVillas });
               // this.setState({ discountedVillas: res.data.data });
           })
           .catch(function (error) {
               console.log('error')
           })  }
       {  economicVillas()
           .then(res => {
               this.setState({ economicVillas: res.data.data });
           })
           .catch(function (error) {
               console.log('error')
           })  }
           /*
       {  search()
           .then(res => {
               this.setState({ searchPageVillas: res.data.data });
           })
           .catch(function (error) {
               console.log('error')
           })  }  */



    }

    postAndPushResultSearchPageVillas = (data)=> {
        console.log(data)
        doSearch(data)
            .then(res => {
                this.setState({searchPageVillas: res.data.data , lastPageOfSearchPage:res.data.meta.last_page , totalVillas:res.data.meta.total , SearchResultWaitingHandle:false});
            })
            .catch(function (error) {
                console.log(error.response)
            })
    }



    postAndPushResultVillaShow = (data)=> {
        villa(data)
            .then(res => {
                this.setState({resultVilla: res.data.data });
            })
            .catch(function (error) {
                console.log('error')
            })
    }





    getData =(url)=>{
        fetch(url)                            /* GET */
            .then(response => response.json())
            .then(json => {
                this.setState({data:json.support});
            });
        return this.state.data
    }





    postDataAndPush = (data)=>{
      /*  const data2 = {
            passengers_count:10
        } */
       /* const data2 = {orderBy:'Expencive'}  */

        doSearch(data)
            .then(res => {
                this.setState({ resultSearchPageVillas: res.data });
            })
            .catch(function (error) {
                console.log('error')
            })


    /*    fetch(url, {                     // POST
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        })
            .then(response => response.json())
            .then(postddata =>{
                if(postddata){
                    console.log(data)
                    this.setState({PostData:"Successful" })
                    this.props.history.push(push)
                } else this.setState({PostData:"UnSuccessful"})
            }); */

    }



    postData = (url , data)=>{


        fetch(url, {                     /* POST */
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data})
        })
            .then(response => response.json())
            .then(postddata =>{
                if(postddata){
                    console.log(data)
                    this.setState({PostData:"Successful" })
                } else this.setState({PostData:"UnSuccessful"})
            });
    }
    render() {
        // pass new properties to wrapped component
        return <Datas {...this.props} {...this.state} />
    }

}
export default Datas