import React, {SyntheticEvent, useEffect, useState} from 'react';
import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Form/Input/Input";
import Modal from "../../../components/UI/Modal/Modal";
import {toast} from "react-toastify";
import api, {getApi} from "../../../apis/api";
import errorMessage from "../../../response/errorResponse";

const QuestionAnswer = () => {

    const FAKE_POST_DETAIL = "63a48393355d872777f973d2"

    const [questions, setQuestions] = useState<{
        question: string,
        answer?: string,
        customerId?: string
        createdAt: Date
    }[]>([])

    useEffect(() => {
       (async function(productId: string){
           // fetch product Questions and Answers

           //!Note i use product_questions for all from product product_questions for product id 1
           const response2 = await api.get(`/api/product/questions/${productId}`)
           if (response2.status === 200) {
               // let {  answer, answerer_id, created_at, product_id, question, question_id, questioner_id } = response2.data
               setQuestions(response2.data.questions)

           }
       }(FAKE_POST_DETAIL)) // fake product questions for re use ability
    }, [])


    function handleAddQuestion(e: SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();


        let a = e.target as any;

        let question = (a.question as HTMLInputElement).value
        if (!question) {
            return toast.error("Please write your question")
        }

        getApi().post("/api/product/question", {
            productId: FAKE_POST_DETAIL, // fake id
            // productId: productDetail._id,
            question: question,
        }).then(({status, data}) => {
            if (status === 201) {
                toast.success("Review Added successfully")
                setOpenAddQuestionModal(false)
                setQuestions(data)
            }
        }).catch(ex => {
            return toast.error(errorMessage(ex))
        })
    }


    function addQuestionModal() {
        return (
            <form onSubmit={handleAddQuestion}>
                <h3 className="my-2 font-medium text-center">Ask Question</h3>
                <Input name="question" type="textarea" label="Question"/>
                <Button type="submit" className="btn-primary">Submit</Button>

            </form>
        )
    }

    const [isOpenAddQuestionModal, setOpenAddQuestionModal] = useState(false)


    return (
        <div>
            <div className="mt-6">

                <Modal isOpen={isOpenAddQuestionModal} className="max-w-lg" backdropClass="bg-dark-900/80"
                       onClose={() => setOpenAddQuestionModal(false)}>
                    {addQuestionModal()}
                </Modal>

                <div className="flex justify-between items-center">
                    <h1 className="sec_label font-semibold text-2xl">Questions and Answers</h1>
                    <button className="btn bg-primary-400 text-white" onClick={() => setOpenAddQuestionModal(true)}>Add Question</button>
                </div>


                <div className="w-full">
                    {questions && questions?.map(qus => (
                        <div className="each_qus_section flex flex-col">
                            <div>
                                <span>Q:</span>
                                <span className="text-gray-600 text-sm ml-2"><label
                                    htmlFor="">{qus.question}</label></span>
                            </div>

                            <div>
                                <span>A:</span>
                                <span className='text-gray-600 text-sm ml-2'>{qus.answer && qus.answer}</span>
                            </div>
                        </div>
                    ))}
                </div>
                <Button className="btn-primary">All questions</Button>
            </div>
        </div>
    );
};

export default QuestionAnswer;