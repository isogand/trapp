import React, {Component} from "react";


class PersianNumber extends Component {

    componentDidMount () {

            const persian={0:'۰',1:'۱',2:'۲',3:'۳',4:'۴',5:'۵',6:'۶',7:'۷',8:'۸',9:'۹'};
            function traverse(el){
                if(el.nodeType==3){
                    var list=el.data.match(/[0-9]/g);
                    if(list!=null && list.length!=0){
                        for(var i=0;i<list.length;i++)
                            el.data=el.data.replace(list[i],persian[list[i]]);
                    }
                }
                for(var i=0;i<el.childNodes.length;i++){
                    traverse(el.childNodes[i]);
                }
            }
            traverse(document.body);

    }

    render() {
        let en_number = this.props.number.toString();
        let persianDigits = "۰۱۲۳۴۵۶۷۸۹";
        let persianMap = persianDigits.split("");
        let persian_number = en_number.replace(/\d/g, function (m) {
            return persianMap[parseInt(m)];
        });

        return (
            <span>{persian_number}</span>
        )


    }

}


export default PersianNumber