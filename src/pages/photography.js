import React from 'react';
import "../styles/photography.css"
export default function Photos() {
  return (
    <div className="page_section" id="photography">
      <div className="page_seperator"></div>
      <h1 className="page_header rotated" >Photography</h1>
      <div className="album_container">

        <div className="album">
          <a className="album_link" aria-label="view pictures of FIU Campus at Night" href="https://photos.josehernandez.dev/night-campus-photography">
            <h3 className="album_header">FIU Campus at Night</h3>
            <img className="album_image" aria-hidden="true" src="https://cdn.myportfolio.com/26ec1f40-ebd7-4527-ba00-e1063aa0c589/5936288b-973d-4db9-8fcd-fb6adabc1642_rw_1920.jpg?h=728420d230323c0bd8a540aec916f3e9" />
          </a>
        </div>

        <div className="album">
          <a className="album_link" aria-label="view pictures of FIU Walk on Water 2022 event" href="https://photos.josehernandez.dev/fiu-walk-on-water-2022">
            <h3 className="album_header">FIU Walk on Water 2022</h3>
            <img className="album_image" aria-hidden="true" src="https://cdn.myportfolio.com/26ec1f40-ebd7-4527-ba00-e1063aa0c589/53235ce2-4437-446f-8905-255277d79423_rw_1920.jpg?h=d11b7ba74b7323102a2362a083692aec" />
          </a>
        </div>

        <div className="album">
          <a className="album_link" aria-label="view pictures of FIU Spikball Fall 2023" href="https://photos.josehernandez.dev/spikeball-sept-2023">
            <h3 className="album_header">FIU Spikball Fall 2023</h3>
            <img className="album_image" aria-hidden="true" src="https://cdn.myportfolio.com/26ec1f40-ebd7-4527-ba00-e1063aa0c589/59bf2217-22c7-403a-97ba-c03c2c316026_rw_1920.jpg?h=a28b5e7398a710b71ac516030beb2ea5" />
          </a>
        </div>

        <div className="album">
          <a className="album_link" aria-label="view pictures of FIU Freshman Convocation 2021 freshman convocation ceremony" href="https://photos.josehernandez.dev/21convocation">
            <h3 className="album_header">FIU Freshman Convocation 2021</h3>
            <img className="album_image" aria-hidden="true" src="https://cdn.myportfolio.com/26ec1f40-ebd7-4527-ba00-e1063aa0c589/54365724-6688-49cd-b8d1-73cbef29928b_rw_1920.jpg?h=436fb50d6acc9b736096836b376a63d3" />
          </a>
        </div>

      </div>
    </div>
  )
}
