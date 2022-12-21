import React from 'react';

const QuestionAnswer = (props) => {
    const {productDetail} = props
    return (
        <div>
            <div className="mt-6">
                <h1 className="sec_label font-normal text-base">Questions and Answers</h1>
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
                {/*<button className="hover:text-primary-400 text-[14px] font-normal">All questions</button>*/}
            </div>
        </div>
    );
};

export default QuestionAnswer;