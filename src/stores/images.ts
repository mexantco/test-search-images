import { makeAutoObservable, runInAction } from "mobx";
import AxiosInstance from "../api";

interface ImageResult {
    urls: {
      small: string;
    };
  }

export class imagesStore {
    q:null|string=null
    loading :boolean = false
    images :any[] = []
    page:number=1
    constructor(){
        makeAutoObservable(this)
    }
    fetchImages = async (q:string, ni: boolean): Promise<void>=>{
        // this.q=q
        await AxiosInstance.get(`/search/photos/?client_id=nIVqtTtgQNo-JFIeCunucDuXZl-Pjw3CZM8Eyo1_z9k&query=${q}&page=${ni?this.page:1}`)
        .then((res)=>{
            let arr: string[] = res.data.results.map((el: ImageResult) => el.urls.small);
            runInAction(()=>{
                
                this.images = ni?[...this.images,...arr]:arr
                this.page+=1
            })
            })
        .catch((error)=>{console.log(error)})
        
    }
    setQuery = (q:string): void=>{
        runInAction(()=>{
            this.q=q
        })
    }
    clearSearch =  ():void=> {
            runInAction(()=>{
                this.q=''
                this.images = []
                this.page=1
            })
    }
}