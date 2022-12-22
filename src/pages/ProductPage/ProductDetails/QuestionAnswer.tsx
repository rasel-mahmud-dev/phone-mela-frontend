import React from 'react';
import Button from "../../../components/UI/Button/Button";

const QuestionAnswer = (props) => {
    const {productDetail} = props
    return (
        <div>
            <div className="mt-6">
                <h1 className="sec_label font-semibold text-2xl">Questions and Answers</h1>
                <div className="flex w-full">
                    {productDetail && productDetail.product_questions && productDetail.product_questions.map(qus => (
                        <div className="each_qus_section flex-1">
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