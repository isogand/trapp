import React from "react";
import "../style/WaitingStyle/waiting.scss"
import loader from '../images/b96dOB0.gif'

export const Waiting = (clickStatus , className) =>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
                {/*<svg className="circular" viewBox="25 25 50 50">*/}
                {/*    <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2"*/}
                {/*            stroke-miterlimit="10"/>*/}
                {/*</svg>*/}
                <img src={loader}/>
            </div>
        </div>

    )
}

export const waitingForCalculate = (clickStatus , className)=>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
            <div id="ballsWaveG">
                <div id="ballsWaveG_1" className="ballsWaveG"></div>
                <div id="ballsWaveG_2" className="ballsWaveG"></div>
                <div id="ballsWaveG_3" className="ballsWaveG"></div>
                <div id="ballsWaveG_4" className="ballsWaveG"></div>
                <div id="ballsWaveG_5" className="ballsWaveG"></div>
                <div id="ballsWaveG_6" className="ballsWaveG"></div>
                <div id="ballsWaveG_7" className="ballsWaveG"></div>
                <div id="ballsWaveG_8" className="ballsWaveG"></div>
            </div>
            </div>
        </div>
    )
}


export const waitingForCalculate2 = (clickStatus , className)=>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
                <div id="loadFacebookG">
                    <div id="blockG_1" className="facebook_blockG"></div>
                    <div id="blockG_2" className="facebook_blockG"></div>
                    <div id="blockG_3" className="facebook_blockG"></div>
                </div>
            </div>
        </div>
    )
}



export const WaitingLoadingProfilePage2 = (clickStatus , className)=>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
                <div className="cssload-wrap">
                    <div className="cssload-container">
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                        <span className="cssload-dots"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export const WaitingLoadingProfilePage = (clickStatus , className)=>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
                <div id="spinningSquaresG">
                    <div id="spinningSquaresG_1" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_2" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_3" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_4" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_5" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_6" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_7" className="spinningSquaresG"></div>
                    <div id="spinningSquaresG_8" className="spinningSquaresG"></div>
                </div>
            </div>
        </div>
    )
}


export const WaitingLoadingProfilePage3 = (clickStatus , className)=>{
    return(
        <div className={`${className} fv-publicWaiting`}>
            <div className={clickStatus ? "loaderImage" : "fv-hideLoader"}>
                <div className={ "cssload-wave" }>
                    <span></span><span></span><span></span><span></span><span></span>
                </div>
            </div>
        </div>
    )
}




