import { useState, useEffect } from 'react';
import { StarIcon } from 'lucide-react';
import { validateEmail } from '../helpers/validate';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

export default function RatingAndComment({ productId }: { productId: string }) {
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(0); // Estado para controlar a nota
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState<
  { email: string; text: string; rating: number }[]
  >([]);

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem(productId) || '[]');
    setReviews(savedReviews);
  }, [productId]);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateEmail(email) || rating === 0) {
      setError('Campos inválidos');
      return;
    }

    const newReview = { email, text, rating };

    const savedReviews = JSON.parse(localStorage.getItem(productId) || '[]');
    savedReviews.push(newReview);

    localStorage.setItem(productId, JSON.stringify(savedReviews));
    setReviews(savedReviews);

    setEmail('');
    setText('');
    setRating(0);
    setError('');
  };

  return (
    <div>
      <h4>Avalie o produto:</h4>
      <form noValidate onSubmit={ handleSubmit }>
        {error && <p className="text-red-500">{error}</p>}

        <label htmlFor="email-id">
          <Input
            type="email"
            name="email"
            id="email-id"
            value={ email }
            onChange={ handleEmailChange }
            placeholder="Email (obrigatório)"
            required
            className="email"
          />
        </label>

        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <label
              key={ index }
              htmlFor={ `rating-${index}` }
              className="cursor-pointer"
              onClick={ () => setRating(index) }
            >
              <input
                type="radio"
                name="rating"
                id={ `rating-${index}` }
                value={ index }
                className="hidden"
              />
              <StarIcon
                className={ `h-6 w-6 ${
                  index <= rating ? 'text-yellow-400' : 'text-gray-300'
                } transition-colors` }
                style={ {
                  fill: index <= rating ? '#fbbf24' : '#d1d5db', // Muda o interior
                } }
              />
            </label>
          ))}
        </div>

        <label htmlFor="text-area-id">
          <p>Comentário:</p>
          <Textarea
            name="text"
            id="text-area-id"
            value={ text }
            onChange={ handleTextChange }
            placeholder="Deixe seu comentário"
            className="mt-4"
          />
        </label>

        <Button
          variant="gradient"
          type="submit"
          style={ { display: 'block', marginLeft: '45%', marginTop: '16px' } }
        >
          Enviar
        </Button>
      </form>

      <div>
        <h2>Avaliações:</h2>
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={ index } className="mt-4 border-b pb-2">
              <div className="flex gap-1">
                <h3>
                  {review.email}
                </h3>
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={ star }
                    className={ `h-6 w-6 ${
                      star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    } transition-colors` }
                    style={ {
                      fill: star <= review.rating ? '#fbbf24' : '#d1d5db',
                    } }
                  />
                ))}
              </div>
              <p>
                Comentário:
                {' '}
                {review.text}
              </p>

            </div>
          ))
        ) : (
          <p>Nenhuma avaliação ainda.</p>
        )}
      </div>
    </div>
  );
}
