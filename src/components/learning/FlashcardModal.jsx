import React, { useState } from 'react';
import { X, Layers, RotateCw, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, RotateCcw, Sparkles, Bookmark } from 'lucide-react';
export const FlashcardModal = ({ deck, isOpen, onClose, onToggleBookmark }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [ratings, setRatings] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    if (!isOpen || !deck || !deck.cards || deck.cards.length === 0)
        return null;
    const currentCard = deck.cards[currentIndex];
    const totalCards = deck.cards.length;
    const handleFlip = () => {
        setIsFlipped(prev => !prev);
    };
    const handleRate = (rating) => {
        setRatings(prev => ({ ...prev, [currentIndex]: rating }));
        if (currentIndex < totalCards - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsFlipped(false);
        }
        else {
            setIsFinished(true);
        }
    };
    const handleRestart = () => {
        setRatings({});
        setCurrentIndex(0);
        setIsFlipped(false);
        setIsFinished(false);
    };
    const knowCount = Object.values(ratings).filter(r => r === 'Know it').length;
    const needPracticeCount = Object.values(ratings).filter(r => r === 'Need practice').length;
    return (<div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container max-w-xl" onClick={e => e.stopPropagation()} style={{ padding: 0, overflow: 'hidden' }}>
        {/* Header */}
        <div style={{
            padding: '16px 20px',
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
              <Layers size={20}/>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-amber">{deck.subject}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{deck.classGroup}</span>
              </div>
              <h2 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                {deck.title}
              </h2>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button onClick={() => onToggleBookmark(deck.id)} style={{ color: deck.isBookmarked ? '#D97706' : 'var(--text-muted)' }}>
              <Bookmark size={18} style={{ fill: deck.isBookmarked ? '#D97706' : 'none' }}/>
            </button>
            <button onClick={onClose} style={{ color: 'var(--text-muted)' }}>
              <X size={20}/>
            </button>
          </div>
        </div>

        {/* Card Body */}
        {!isFinished ? (<div style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              <span>Card {currentIndex + 1} of {totalCards}</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{ color: 'var(--color-success)' }}>{knowCount} Mastered</span>
                <span>•</span>
                <span style={{ color: '#D97706' }}>{needPracticeCount} Need Practice</span>
              </div>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#E2E8F0', borderRadius: '999px', overflow: 'hidden', marginBottom: '20px' }}>
              <div style={{ width: `${((currentIndex + 1) / totalCards) * 100}%`, height: '100%', backgroundColor: '#D97706', transition: 'width 300ms ease' }}/>
            </div>

            {/* Flip Card Canvas */}
            <div onClick={handleFlip} style={{
                minHeight: '220px',
                borderRadius: '16px',
                border: '2px solid var(--border-light)',
                backgroundColor: isFlipped ? '#F8FAFC' : '#FFFFFF',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 200ms ease'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800 }}>
                <span>{isFlipped ? 'Answer / Explanation' : 'Concept / Prompt'}</span>
                <span style={{ color: 'var(--accent-blue)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <RotateCw size={13}/> Click to flip
                </span>
              </div>

              <div style={{ margin: 'auto 0', padding: '16px 0' }}>
                {!isFlipped ? (<h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    {currentCard.front}
                  </h3>) : (<div>
                    <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-navy)', lineHeight: 1.4 }}>
                      {currentCard.back}
                    </h4>
                    {currentCard.example && (<p style={{
                        marginTop: '12px',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        fontSize: '0.78rem',
                        color: 'var(--text-secondary)',
                        textAlign: 'left'
                    }}>
                        💡 <strong>Example:</strong> {currentCard.example}
                      </p>)}
                  </div>)}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                Topic: {currentCard.topic}
              </div>
            </div>

            {/* Self-Rating buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
              <button onClick={() => handleRate('Need practice')} className="btn btn-secondary" style={{ color: '#D97706', borderColor: '#FDE68A', backgroundColor: '#FEF3C7', fontWeight: 800 }}>
                <AlertCircle size={16}/>
                <span>Need Practice</span>
              </button>
              <button onClick={() => handleRate('Know it')} className="btn btn-primary" style={{ backgroundColor: 'var(--color-success)', borderColor: 'var(--color-success)', fontWeight: 800 }}>
                <CheckCircle2 size={16}/>
                <span>Know It!</span>
              </button>
            </div>

            {/* Nav */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
              <button onClick={() => {
                if (currentIndex > 0) {
                    setCurrentIndex(prev => prev - 1);
                    setIsFlipped(false);
                }
            }} disabled={currentIndex === 0} className="btn btn-secondary btn-sm">
                <ArrowLeft size={14}/>
                <span>Previous</span>
              </button>

              <button onClick={() => {
                if (currentIndex < totalCards - 1) {
                    setCurrentIndex(prev => prev + 1);
                    setIsFlipped(false);
                }
                else {
                    setIsFinished(true);
                }
            }} className="btn btn-secondary btn-sm">
                <span>Skip</span>
                <ArrowRight size={14}/>
              </button>
            </div>
          </div>) : (
        /* Finished screen */
        <div style={{ padding: '36px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
              <Layers size={32}/>
            </div>

            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#D97706' }}>
                Deck Review Completed
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--primary-navy)', marginTop: '2px' }}>
                You Reviewed All {totalCards} Cards
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {knowCount} mastered, {needPracticeCount} to practice again.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
              <button onClick={handleRestart} className="btn btn-secondary btn-sm">
                <RotateCcw size={14}/>
                <span>Review Again</span>
              </button>
              <button onClick={onClose} className="btn btn-primary btn-sm">
                Close Deck
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
            <span>Active recall flashcards for pilot classes.</span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>
            Close
          </button>
        </div>
      </div>
    </div>);
};
