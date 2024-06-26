import { MathJax } from "better-react-mathjax";
import McqQuestionOptions from "./McqQuestionOptions";

function SingleQuestion({ question, version, selectedOption, onSelect }) {
  const handleOptionSelect = (option) => {
    onSelect(question?._id, option);
  };
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h5 className="text-sm border-b border-gray-400 w-fit text-gray-500">
        Question {question?.serial_no}
      </h5>
      <div className="">
        {question?.title?.image && (
          <img src={`${question?.title?.image}`} alt="Question Image" />
        )}
      </div>
      <h4 className="my-3 text-lg">
        <MathJax>{question?.title[version]}</MathJax>
      </h4>
      <McqQuestionOptions
        options={question?.options}
        questionId={question?._id}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
        version={version}
      />
    </div>
  );
}

export default SingleQuestion;
