import React, {Component} from "react";
import {MDBContainer} from "mdbreact";
import DisplayHeader from "../componentsPages/DisplayHeader";

class RulesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        // قوانین را به صورت آرایه نگهداری میکنیم و آن را نمایش میدهیم باا استفاده از map
        const roules = [' .این سرویس تنها رابطی بین شما و دیگر اعضاء و کاربران می باشد و هیچگونه کنترل و دخالتی بر انجام تعهدات میزبان، مهمان و دیگر کاربران ندارد',
            '.دقت کنید در هنگام پرکردن فرم و لیست، اطلاعات صحیح به طور کامل ارائه گردد',
            '.کاربر توافق می کند که هیچ عملکرد اشتباهی که بازتاب منفی بر سایت بگذارد انجام نخواهد داد',
            '.در صورتیکه در قوانین مندرج، رویه ها و سرویس‌دهی‌ها در آینده تغییراتی ایجاد شود، در همین صفحه منتشر و به‌روزرسانی خواهد شد',
            'اگر کاربر نیابتاً از طرف شخص حقوقی این شرایط را می پذیرد یعنی این قدرت را دارد که آنها را پایبند به ضوابط و شرایط کند. وب سایت شب، تابع قوانین کشور جمهوری اسلامی ایران بوده و اطلاعات وارد شده توسط اعضا که مغایر با این قوانین تشخیص داده شود حذف خواهد شد']
        return (
            <MDBContainer className={"fv-SearchHomePage fv-DisplayPage fv-DisplayPageOnly"}>

                <MDBContainer className={this.state.morePics === true ? "fv-MadeDisplayNoneForPics" : ""}>

                    <MDBContainer className={'fv-footerMenu fv-footerDisplayPage'}>

                        <div className={'fv-footerMenu fv-footerDisplayPage'}>
                            <DisplayHeader  {...this.props}/>
                        </div>

                    </MDBContainer>

                    <MDBContainer style={{textAlign: 'end'}}>
                        <h6 style={{marginBottom: '2%'}}>
                            قوانین و شرایط استفاده از ترپ
                        </h6>
                        <p style={{marginBottom: '8%'}}>
                            کاربر گرامی لطفا موارد زیر را جهت استفاده بهینه از خدمات و برنامه‌های این سایت به دقت ملاحضه
                            فرمایید. ورود کاربران به سایت و استفاده از پروفایل شخصی، دانلود، آپلود و سایر خدمات به معنی
                            آگاه بودن، پذیرفتن شرایط و قوانین و نحوه استفاده از سرویس است در صورت نپذیرفتن آن مجوز
                            استفاده را ندارند.
                        </p>

                        <h6 style={{marginBottom: '2%'}}>
                            شرایط عمومی
                        </h6>
                        {roules.map(rule => {
                            return <p>
                                {rule}
                            </p>
                        })}

                     
                    </MDBContainer>
                </MDBContainer>
            </MDBContainer>
        )
    }
}

export default RulesPage