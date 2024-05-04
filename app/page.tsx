"use client";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { FaStar } from "react-icons/fa";

type Review = {
  username: string;
  rating: number;
  review: string;
};

const Home = () => {
  const [reviews, setReviews] = useState<Array<Review>>([]);
  const [username, setUsername] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState("");
  const [hoverStar, setHoverStar] = useState(0);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleNewReview = (e: FormEvent) => {
    e.preventDefault();

    if (!username) {
      setError(true);
      setErrorText("Please, fill the username field");
      return;
    }
    
    if (!rating) {
      setError(true);
      setErrorText("Please, give us your star rating");
      return;
    }

    setError(false)

    const formData: Review = {
      username: username,
      rating: rating,
      review: review,
    };

    setUsername("");
    setRating(0);
    setReview("");

    setReviews([formData, ...reviews]);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (rating: number) => {
    setRating(rating);
  };

  const handleHoverStarChange = (rating: number) => {
    setHoverStar(rating);
  };

  return (
    <div className="flex flex-col bg-slate-600 min-h-screen">
      <header className="h-16 bg-slate-900 flex items-center justify-center text-white px-3 py-2">
        <div className="w-full max-w-[1200px] flex justify-between">
          <h1 className="font-bold text-xl cursor-default">Customers Review</h1>
          <nav>
            <ul className="flex gap-8">
              <Link className="hover:text-slate-400 duration-300" href={""}>
                Reviews
              </Link>
              <Link className="hover:text-slate-400 duration-300" href={""}>
                About
              </Link>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex justify-center pt-16 pb-4">
        <div className="flex flex-col gap-3 bg-slate-200 p-6 rounded-2xl min-w-24 max-w-[95%] lg:max-w-[60%]">
          <form
            onSubmit={handleNewReview}
            className="grid grid-cols-[1fr_100px] gap-2 w-full items-center"
          >
            <span className="font-bold text-xl col-span-2">
              Submit a Review
            </span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="w-full px-2 py-1 rounded-lg focus:outline-none"
              onChange={handleUsernameChange}
            />
            <div className="flex justify-end">
              {[...Array(5)].map((star, index) => {
                const currentRating = index + 1;

                return (
                  <label>
                    <input
                      type="radio"
                      name="star"
                      onClick={() => handleRatingChange(currentRating)}
                      className="hidden"
                    />
                    <FaStar
                      size={20}
                      className={`${
                        currentRating <= (rating || hoverStar)
                          ? "fill-yellow-400"
                          : "fill-slate-600"
                      } cursor-pointer`}
                      onMouseEnter={() => handleHoverStarChange(currentRating)}
                      onMouseLeave={() => handleHoverStarChange(0)}
                    />
                  </label>
                );
              })}
            </div>
            <textarea
              value={review}
              className="w-full px-2 py-1 rounded-lg focus:outline-none col-span-2 min-h-16 max-h-72"
              onChange={handleReviewChange}
              placeholder="Review"
            />
            <button
              type="submit"
              className="duration-200 col-span-2 bg-green-600 font-bold hover:bg-white px-2 py-1 rounded-lg text-white hover:text-green-800"
            >
              Submit Review
            </button>
            {error && <span className="text-red-500 text-sm">{errorText}</span>}
          </form>

          <div className="flex flex-col border-t-slate-900 border-t-2 py-3">
            <span className="font-bold text-lg cursor-default">Reviews</span>

            <div className="flex flex-col gap-3">
              {reviews.map((e: Review) => {
                return (
                  <div className="flex flex-col p-2 bg-slate-500 rounded-lg">
                    <div className="flex items-center  justify-between gap-2  py-2">
                      <span className="font-bold text-slate-200">
                        {e.username}
                      </span>
                      <div className="flex justify-end">
                        {[...Array(5)].map((star, index) => {
                          const currentRating = index + 1;
                          let _rating = e.rating;
                          let _index = index + 1;
                          let _check = _index <= _rating;
                          return (
                            <label>
                              <FaStar
                                size={20}
                                className={`${
                                  _check ? "fill-yellow-400" : "fill-slate-600"
                                }`}
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                    {e.review && <span className="py-2 text-sm text-wrap text-slate-200 border-t-2 border-t-slate-400">
                      {e.review}
                    </span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
