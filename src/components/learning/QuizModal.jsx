import React, { useState } from 'react';
import { X, HelpCircle, CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, RotateCcw, Trophy, Sparkles } from 'lucide-react';
export const QuizModal = ({ quiz, isOpen, onClose, onCompleteQuiz }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [revealedExplanations, setRevealedExplanations] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    if (!isOpen || !quiz || !quiz.questions || quiz.questions.length === 0)
        return null;
    const currentQ = quiz.questions[currentIndex];
    const totalQuestions = quiz.questions.length;
    const isAnswered = selectedAnswers[currentIndex] !== undefined;
    const isCorrect = isAnswered && selectedAnswers[currentIndex] === currentQ.correctIndex;
    const handleSelectOption = (optionIndex) => {
        if (revealedExplanations[currentIndex])
            return;
        setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    };
    const handleCheckAnswer = () => {
        if (selectedAnswers[currentIndex] === undefined)
            return;
        setRevealedExplanations(prev => ({ ...prev, [currentIndex]: true }));
    };
    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex(prev => prev + 1);
        }
        else {
            calculateAndFinish();
        }
    };
    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };
    const calculateAndFinish = () => {
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctIndex) {
                correctCount++;
            }
        });
        const percentScore = Math.round((correctCount / totalQuestions) * 100);
        onCompleteQuiz(quiz.id, percentScore);
        setIsFinished(true);
    };
    const handleRestart = () => {
        setSelectedAnswers({});
        setRevealedExplanations({});
        setCurrentIndex(0);
        setIsFinished(false);
    };
    let finalScore = 0;
    if (isFinished) {
        let correctCount = 0;
        quiz.questions.forEach((q, idx) => {
            if (selectedAnswers[idx] === q.correctIndex) {
                correctCount++;
            }
        });
        finalScore = Math.round((correctCount / totalQuestions) * 100);
    }
    return (<div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container max-w-2xl" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
            padding: '16px 22px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'var(--bg-card-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: '#FEF3C7',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
              <HelpCircle size={20}/>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-purple">{quiz.subject}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{quiz.classGroup}</span>
              </div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                {quiz.title}
              </h2>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
            <X size={20}/>
          </button>
        </div>

        {/* Quiz Flow or Results */}
        {!isFinished ? (<div style={{ padding: '24px 28px' }}>
            {/* Progress & Counter */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <span>Question {currentIndex + 1} of {totalQuestions}</span>
              <span>Topic: {quiz.topic}</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%`, height: '100%', backgroundColor: 'var(--accent-blue)', transition: 'width 300ms ease' }}/>
            </div>

            {/* Question */}
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.4, marginBottom: '20px' }}>
              {currentQ.question}
            </h3>

            {/* Options list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = selectedAnswers[currentIndex] === optIdx;
                const isChecked = revealedExplanations[currentIndex];
                const isOptCorrect = optIdx === currentQ.correctIndex;
                let borderCol = 'var(--border-light)';
                let bgCol = '#FFFFFF';
                let textCol = 'var(--text-main)';
                if (isChecked) {
                    if (isOptCorrect) {
                        borderCol = 'var(--color-success)';
                        bgCol = 'var(--color-success-bg)';
                        textCol = 'var(--color-success)';
                    }
                    else if (isSelected && !isOptCorrect) {
                        borderCol = 'var(--color-danger)';
                        bgCol = 'var(--color-danger-bg)';
                        textCol = 'var(--color-danger)';
                    }
                }
                else if (isSelected) {
                    borderCol = 'var(--accent-blue)';
                    bgCol = 'var(--accent-blue-soft)';
                    textCol = 'var(--accent-blue)';
                }
                return (<button key={optIdx} onClick={() => handleSelectOption(optIdx)} disabled={revealedExplanations[currentIndex]} style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        border: `2px solid ${borderCol}`,
                        backgroundColor: bgCol,
                        color: textCol,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontWeight: isSelected ? 700 : 500,
                        cursor: isChecked ? 'default' : 'pointer',
                        transition: 'all 120ms ease'
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{
                        width: '26px',
                        height: '26px',
                        borderRadius: '6px',
                        backgroundColor: isSelected ? 'var(--accent-blue)' : '#E2E8F0',
                        color: isSelected ? '#FFFFFF' : '#334155',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.75rem'
                    }}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isChecked && isOptCorrect && <CheckCircle2 size={18} color="var(--color-success)"/>}
                    {isChecked && isSelected && !isOptCorrect && <AlertCircle size={18} color="var(--color-danger)"/>}
                  </button>);
            })}
            </div>

            {/* Curriculum Explanation */}
            {revealedExplanations[currentIndex] && (<div style={{
                    padding: '14px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isCorrect ? 'var(--color-success-bg)' : 'var(--accent-blue-soft)',
                    border: `1px solid ${isCorrect ? 'var(--color-success-border)' : 'var(--accent-blue-border)'}`,
                    fontSize: '0.82rem',
                    color: isCorrect ? 'var(--color-success)' : 'var(--primary-navy)',
                    marginBottom: '20px'
                }}>
                <div style={{ fontWeight: 800, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={15} color="var(--accent-blue)"/>
                  <span>Curriculum Explanation:</span>
                </div>
                <div style={{ lineHeight: 1.5 }}>
                  {currentQ.explanation}
                </div>
              </div>)}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <button onClick={handlePrev} disabled={currentIndex === 0} className="btn btn-secondary btn-sm">
                <ArrowLeft size={14}/>
                <span>Previous</span>
              </button>

              <div>
                {!revealedExplanations[currentIndex] ? (<button onClick={handleCheckAnswer} disabled={selectedAnswers[currentIndex] === undefined} className="btn btn-primary btn-sm" style={{ backgroundColor: '#7C3AED', borderColor: '#7C3AED', fontWeight: 800 }}>
                    Check Answer
                  </button>) : (<button onClick={handleNext} className="btn btn-primary btn-sm" style={{ fontWeight: 800 }}>
                    <span>{currentIndex === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                    <ArrowRight size={14}/>
                  </button>)}
              </div>
            </div>
          </div>) : (
        /* Results Summary Screen */
        <div style={{ padding: '36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
              <Trophy size={36}/>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#D97706' }}>
                Quiz Attempt Completed!
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                You Scored {finalScore}%
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {finalScore >= 75 ? 'Excellent mastery! Recorded in your local practice log.' : 'Good effort! Review the lesson notes and try again.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', marginTop: '10px' }}>
              <button onClick={handleRestart} className="btn btn-secondary btn-sm">
                <RotateCcw size={14}/>
                <span>Retake Quiz</span>
              </button>
              <button onClick={onClose} className="btn btn-primary btn-sm">
                Return to Learning Centre
              </button>
            </div>
          </div>)}

        {/* Footer */}
        <div style={{
            padding: '12px 20px',
            borderTop: '1px solid var(--border-light)',
            backgroundColor: 'var(--bg-card-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#D97706"/>
            <span>Pilot formative quiz: informal practice check.</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            Close
          </button>
        </div>
      </div>
    </div>);
};
