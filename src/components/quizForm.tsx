import React from 'react'
import questions from '@/data/sampleQuestionsTest'

function Quizzes() {
  return (
    <div className='flex flex-col gap-8'>
        {questions.map((question) => (
            <fieldset className="fieldset space-y-6" key={question.id}>
                <legend className="fieldset-legend text-lg font-bold capitalize mb-2">{question.question}</legend>
                {question.options.map((option, index) => (
                    <label className="label px-4 text-base text-base-content" key={index}>
                        <input type="radio" name={`question-${question.id}`} className="radio radio-neutral" />
                        {option}
                    </label>
                ))}
            </fieldset>
        ))}
        <button className="btn btn-primary mt-8">Submit</button>
    </div>
  )
}

export default Quizzes