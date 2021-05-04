import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Search({
  name,
  personality,
  flavor,
  scent,
  price,
  setName,
  setPersonality,
  setFlavor,
  setScent,
  setPrice,
}) {
  let history = useHistory();
  const [page, setPage] = useState(1);

  function createUrl(name, personality, flavor, scent, price) {
    let personalityUrl = '';
    for (const key in personality) {
      personalityUrl += '&' + key + '=' + personality[key];
    }
    let url =
      '?name=' +
      encodeURI(name) +
      personalityUrl +
      '&flavor=' +
      encodeURI(flavor) +
      '&scent=' +
      encodeURI(scent) +
      '&price=' +
      encodeURI(price);

    history.push({
      pathname: '/result/' + url,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (
      personality['personality5'] !== '' &&
      personality['personality6'] !== '' &&
      personality['personality7'] !== '' &&
      personality['personality8'] !== ''
    ) {
      // turn form values to url params
      createUrl(name, personality, flavor, scent, price);
    } else {
      alert(
        'Please fill out all the inputs for us to determine your perfect matches!'
      );
    }
  }

  function handleNext(event) {
    if (page === 1) {
      if (
        flavor.trim() !== '' &&
        scent.trim() !== '' &&
        price.trim() !== '' &&
        parseInt(price.trim()) >= 4 &&
        parseInt(price.trim()) <= 3300
      ) {
        setPage(2);
      } else {
        if (parseInt(price.trim()) < 4 || parseInt(price.trim()) > 3300) {
          alert('Price range must be between $4 to $3300');
        } else {
          alert(
            'Please fill out all the inputs for us to determine your perfect matches!'
          );
        }
      }
    } else if (page === 2) {
      if (
        personality['personality1'] !== '' &&
        personality['personality2'] !== '' &&
        personality['personality3'] !== '' &&
        personality['personality4'] !== ''
      ) {
        setPage(3);
      } else
        alert(
          'Please fill out all the inputs for us to determine your perfect matches!'
        );
    }
  }

  function displayRadio(i) {
    return (
      <>
        <div className='scale'>
          <p>no</p>
          <p></p>
          <p>neutral</p>
          <p></p>
          <p>yes</p>
        </div>
        <div className='radios'>
          <input
            className='radio'
            type='radio'
            name={i}
            value='1'
            checked={personality[i] === '1'}
            onChange={(event) =>
              setPersonality({ ...personality, [i]: event.target.value })
            }
            required
          />
          <input
            className='radio'
            type='radio'
            name={i}
            value='2'
            checked={personality[i] === '2'}
            onChange={(event) =>
              setPersonality({ ...personality, [i]: event.target.value })
            }
            required
          />
          <input
            className='radio'
            type='radio'
            name={i}
            value='3'
            checked={personality[i] === '3'}
            onChange={(event) =>
              setPersonality({ ...personality, [i]: event.target.value })
            }
            required
          />
          <input
            className='radio'
            type='radio'
            name={i}
            value='4'
            checked={personality[i] === '4'}
            onChange={(event) =>
              setPersonality({ ...personality, [i]: event.target.value })
            }
            required
          />
          <input
            className='radio'
            type='radio'
            name={i}
            value='5'
            checked={personality[i] === '5'}
            onChange={(event) =>
              setPersonality({ ...personality, [i]: event.target.value })
            }
            required
          />
        </div>
      </>
    );
  }

  function displayForm(page) {
    if (page === 1) {
      return (
        <>
          <div class='form-group'>
            <label for='name'> What is your name? </label>
            <input
              name='name'
              class='form-control'
              placeholder='Jane Doe'
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoComplete='off'
            />
          </div>
          <div class='form-group'>
            <label for='flavor'>
              Describe your favorite drink (can be non-alcoholic)!
            </label>
            <textarea
              name='flavor'
              class='form-control'
              rows='3'
              value={flavor}
              onChange={(event) => setFlavor(event.target.value)}
              placeholder='Really cold coca-cola during the summer...'
              required
            />
          </div>
          <div class='form-group'>
            <label for='scent'>Describe your favorite scent</label>
            <textarea
              name='scent'
              class='form-control'
              value={scent}
              onChange={(event) => setScent(event.target.value)}
              placeholder='Fresh tangerines...'
              required
            />
          </div>
          <div class='form-group'>
            <label for='price'>
              What is the maximum price you would like to pay?
            </label>
            <input
              name='price'
              class='form-control'
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder='Any price from $4 to $3300!'
              type='number'
              min='4'
              max='3300'
              required
            ></input>
          </div>
          <div class='form-group'>
            <button
              class='btn btn-outline-dark float-right'
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </>
      );
    } else if (page === 2) {
      return (
        <>
          <p>Rate how well the following statements describe you</p>
          <div class='form-group'>
            <label for='personality'>You are the life of a party</label>
            {displayRadio('personality1')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              People near you often rally around you
            </label>
            {displayRadio('personality2')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              You will do whatever it takes to succeed, no matter what
            </label>
            {displayRadio('personality3')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              Your friends come to you for fashion advice
            </label>
            {displayRadio('personality4')}
          </div>
          <div class='form-group'>
            <button
              class='btn btn-outline-dark float-left'
              onClick={() => setPage(1)}
            >
              Previous
            </button>
            <button
              class='btn btn-outline-dark float-right'
              onClick={() => handleNext()}
            >
              Next
            </button>
          </div>
        </>
      );
    } else if (page === 3) {
      return (
        <>
          <div class='form-group'>
            <label for='personality'>
              Life is not fair, and that means you have to look out for yourself
              first and foremost.
            </label>
            {displayRadio('personality5')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              You don't like making a plan because you often end up deviating
              from it anyways.
            </label>
            {displayRadio('personality6')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              You see many relationships in your life as transactional.
            </label>
            {displayRadio('personality7')}
          </div>
          <div class='form-group'>
            <label for='personality'>
              You have high standards of living, and you'll go the extra mile to
              attain that.
            </label>
            {displayRadio('personality8')}
          </div>
          <div class='form-group mb-0'>
            <button
              class='btn btn-outline-dark float-left'
              onClick={() => setPage(2)}
            >
              Previous
            </button>
            <button type='submit' class='btn btn-dark float-right'>
              Submit
            </button>
          </div>
        </>
      );
    }
  }

  return (
    <div className='Search'>
      <form onSubmit={handleSubmit}>{displayForm(page)}</form>
    </div>
  );
}
