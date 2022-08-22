class Calcultor{
    constructor(previousText,currentText){
        this.previousText=previousText
        this.currentText=currentText
        this.clear()
    }
    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined

    }
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1)

    }
    append(number){
        if(number=='.' && this.currentOperand.includes('.'))return
        this.currentOperand=this.currentOperand.toString() + number.toString()

    }
    choose(operation){
        if(this.currentOperand=='')return
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''

    }
    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation){
            case '+':
                computation=prev + current
                break
            case '-':
                computation=prev-current
                break;    
                case '*':
                    computation=prev*current
                    break;    
                    case '÷':
                        computation=prev / current
                        break;  
                        default:
                            return
                                        
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''


    }
    getDisplaNumber(number){
        const stringNumber=number.toString()
        const integerNumber=parseFloat(stringNumber.split('.')[0])
        const decimalNumber=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerNumber)){
            integerDisplay=''
        }else{
            integerDisplay=integerNumber.toLocaleString('en',{
                maximumFractionDigits:0
            })
        }
        if(decimalNumber!=null){
            return `${integerDisplay}.${decimalNumber}`
        }else{
            return integerDisplay
        }
       
        
    }
    update(){
        this.currentText.innerText=this.getDisplaNumber(this.currentOperand)

        if(this.operation!=null){
            this.previousText.innerText=`${this.getDisplaNumber(this.previousOperand)} ${this.operation}`
           
        }else{
            this.previousText.innerText=''
        }
        

    }
}
const numberButtons=document.querySelectorAll('[data-number]');
const operationButtons=document.querySelectorAll('[data-operation]');
const equalsButton=document.querySelector('[data-equals]');
const deleteButton=document.querySelector('[data-delete]');
const clearButton=document.querySelector('[data-clear]');
const previousText=document.querySelector('[data-previous-operand]');
const currentText=document.querySelector('[data-current-operand]');

const calcultor=new Calcultor(previousText,currentText)

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calcultor.append(button.innerText)
        calcultor.update()
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calcultor.choose(button.innerText)
        calcultor.update()
    })
})

equalsButton.addEventListener('click',button=>{
    calcultor.compute()
    calcultor.update()
})

clearButton.addEventListener('click',button=>{
    calcultor.clear()
    calcultor.update()
})

deleteButton.addEventListener('click',button=>{
    calcultor.delete()
    calcultor.update()
})