import React from 'react';
import { CustomSelector, Footer, InputField, Label, Text } from 'xp-ui';

const AVAILABILITY = {
  NOT_SELECTED: 'AVAILABILITY_NOT_SELECTED',
  PERIOD: 'period',
  DATE: 'date',
  NOW: 'now',
  NOT_AVAILABLE: 'not_available',
};

const AVAILABILITY_OPTIONS = [
  {
    value: AVAILABILITY.NOT_AVAILABLE,
    label: 'I am not looking for new opportunities at the moment',
  },
  {
    value: AVAILABILITY.NOW,
    label: `I'm available to start something immediately`,
  },
  { value: AVAILABILITY.DATE, label: `I'll be available on a certain date` },
  {
    value: AVAILABILITY.PERIOD,
    label: `I'm currently employed with a notice period`,
  },
];

const HEAR_ABOUT_OPTIONS = [
  {
    value: 'YouTube',
    label: 'YouTube',
  },
  {
    value: 'Google Ads',
    label: 'Google Ads',
  },
  {
    value: 'LinkeIn',
    label: 'LinkeIn',
  },
  {
    value: 'We Work Remotely',
    label: 'We Work Remotely',
  },
  {
    value: 'Other',
    label: 'Other',
  },
];

const LOCATION_OPTIONS = [
  {
    value: 'PSD (GMT-05:00)',
    label: 'PSD (GMT-05:00)',
  },
  {
    value: 'EST (GMT-03:00)',
    label: 'EST (GMT-03:00)',
  },
  {
    value: 'UK (GMT+00:00)',
    label: 'UK (GMT+00:00)',
  },
  {
    value: 'Poland (GMT+01:00)',
    label: 'Poland (GMT+01:00)',
  },
];

const MAX_TEXTAREA = 250;

export default class App extends React.Component {
  state = {
    selectedAvailability: null,
    selectedLocation: null,
    selectedHear: null,
    aboutTextareaCounter: 0,
    hasErrorHourlyRate: true,
    hourlyRateIsEmpty: false,
    uploadedImgBuffer: null,
    uploadedImgFileName: null,
  };

  handleSelected = (selectedOption, selectName) => {
    this.setState({ [selectName]: selectedOption });
  };

  onChangeAboutTextarea = (event) => {
    const length = event.target.value.length;
    this.setState(() => {
      return {
        aboutTextareaCounter: length,
      };
    });
  };

  onChangeHourlyRate = (event) => {
    const hasError = RegExp(/^[0-9]\d*$/).test(event.target.value);
    const isEmpty = !!event.target.value.length;
    this.setState(() => {
      return {
        hasErrorHourlyRate: hasError,
        hourlyRateIsEmpty: isEmpty,
      };
    });
  };

  isFileImage = (file) => file && file['type'].split('/')[0] === 'image';

  onChangeUploadPhotoInput = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        this.setState(() => {
          return {
            uploadedImgBuffer: reader.result,
          };
        });
      });

      const file = event.target.files[0];

      if (!this.isFileImage(file) || file.size > 5 * 1048576) {
        alert('Invalid image file');
        return;
      }

      this.setState(() => {
        return {
          uploadedImgFileName: file.name,
        };
      });

      reader.readAsDataURL(file);
    }
  };

  onClickResetUploadPhotoInput = () => {
    this.setState(() => {
      return {
        uploadedImgFileName: null,
        uploadedImgBuffer: null,
      };
    });
  };

  render() {
    const {
      selectedAvailability,
      selectedLocation,
      selectedHear,
      aboutTextareaCounter,
      hasErrorHourlyRate,
      hourlyRateIsEmpty,
      uploadedImgBuffer,
      uploadedImgFileName,
    } = this.state;

    return (
      <div className='App'>
        <Text heading='Tell us a bit about yourself.' content='Help us get to know you better.' hasDivider isCentered />

        {/* Form */}
        <form>
          <div className='contentWrapper'>
            {/* profileBlock */}
            <div className='profileBlock'>
              <InputField label='LinkedIn profile URL' />
              <InputField label='Stack Overflow profile URL' />
              <InputField label='GitHub profile URL' />
            </div>

            {/* aboutBlock */}
            <div className='aboutBlock'>
              <Label headline='About you' description='Introduce yourself, write a summary for your profile.'></Label>

              <InputField type='textarea' maxlength={MAX_TEXTAREA} onChange={this.onChangeAboutTextarea} />

              <div className={aboutTextareaCounter >= MAX_TEXTAREA ? 'aboutBlock__counter aboutBlock__counter--Max' : 'aboutBlock__counter'}>
                <strong>{aboutTextareaCounter}/250</strong>
              </div>
            </div>

            {/* uploadPhotoBlock
            <div className='uploadPhotoBlock'>
              <Label headline='Upload your photo' description='Min 200x200px, high quality, ideally square.'></Label>

              <div className='uploadPhotoBlock__uploaderBlock'>
                <div className='uploadPhotoBlock__img'>
                  {!uploadedImgBuffer && (
                    <svg width='95' height='95' viewBox='0 0 64 64' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M24.0002 31.3333C22.1602 31.3333 20.6668 32.8267 20.6668 34.6667C20.6668 36.5067 22.1602 38 24.0002 38C25.8402 38 27.3335 36.5067 27.3335 34.6667C27.3335 32.8267 25.8402 31.3333 24.0002 31.3333ZM40.0002 31.3333C38.1602 31.3333 36.6668 32.8267 36.6668 34.6667C36.6668 36.5067 38.1602 38 40.0002 38C41.8402 38 43.3335 36.5067 43.3335 34.6667C43.3335 32.8267 41.8402 31.3333 40.0002 31.3333ZM32.0002 5.33333C17.2802 5.33333 5.3335 17.28 5.3335 32C5.3335 46.72 17.2802 58.6667 32.0002 58.6667C46.7202 58.6667 58.6668 46.72 58.6668 32C58.6668 17.28 46.7202 5.33333 32.0002 5.33333ZM32.0002 53.3333C20.2402 53.3333 10.6668 43.76 10.6668 32C10.6668 31.2267 10.7202 30.4533 10.8002 29.7067C17.0935 26.9067 22.0802 21.76 24.6935 15.3867C29.5202 22.2133 37.4668 26.6667 46.4535 26.6667C48.5335 26.6667 50.5335 26.4267 52.4535 25.9733C53.0135 27.8667 53.3335 29.8933 53.3335 32C53.3335 43.76 43.7602 53.3333 32.0002 53.3333Z'
                        fill='#CDCDD6'
                      />
                    </svg>
                  )}

                  {uploadedImgBuffer && <img alt='Preview' src={uploadedImgBuffer} />}
                </div>

                <div className='uploadPhotoBlock__input'>
                  {!uploadedImgBuffer && (
                    <div>
                      <input type='file' id='uploadPhotoBlock__input' accept='image/*' onChange={this.onChangeUploadPhotoInput} />
                      <span onClick={() => document.getElementById('uploadPhotoBlock__input').click()}>Browse...</span>
                    </div>
                  )}

                  {uploadedImgBuffer && (
                    <div>
                      {uploadedImgFileName}{' '}
                      <svg
                        onClick={this.onClickResetUploadPhotoInput}
                        width='15'
                        height='18'
                        viewBox='0 0 15 18'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M15 3H0V5H15V3Z' fill='#C2C2C4' />
                        <path d='M13 16H2V18H13V16Z' fill='#C2C2C4' />
                        <path d='M4 5H2V17H4V5Z' fill='#C2C2C4' />
                        <path d='M13 5H11V17H13V5Z' fill='#C2C2C4' />
                        <path d='M11 0H4V2H11V0Z' fill='#C2C2C4' />
                        <path
                          fill-rule='evenodd'
                          clip-rule='evenodd'
                          d='M8.88909 10.4749L9.94975 11.5355L8.53553 12.9497L7.47487 11.8891L6.41421 12.9497L5 11.5355L6.06066 10.4749L5 9.41421L6.41421 8L7.47487 9.06066L8.53553 8L9.94975 9.41421L8.88909 10.4749Z'
                          fill='#C2C2C4'
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>
            */}

            {/* locationBlock */}
            <div className='locationBlock'>
              <Label headline='Location'></Label>
              <CustomSelector options={LOCATION_OPTIONS} />
            </div>

            {/* availabilityBlock */}
            <div className='availabilityBlock'>
              <Label headline='Current availability'></Label>
              <CustomSelector options={AVAILABILITY_OPTIONS} />

              <div className='extraField'>
                <Label headline='When can you start?'></Label>
                <div className='availabilityBlock__dateInput'>
                  <InputField type='date' placeholder={'yyyy-mm-dd'} />
                </div>
              </div>

              <div className='extraField'>
                <Label headline='How long is your notice period?'></Label>

                <div className='availabilityBlock__weeksBlock'>
                  <InputField className='availabilityBlock__weeksInput' type='number' />
                </div>
                <Text content='week(s)' isPureContent />
              </div>
            </div>

            {/* hourlyRateBlock */}
            <div className='hourlyRateBlock'>
              <Label headline='Minimum hourly rate (USD)' description='We’ll keep you notified about jobs above and around this value.'></Label>

              <InputField className={!hasErrorHourlyRate ? 'inputError' : undefined} onChange={this.onChangeHourlyRate} type='number' />

              {!hasErrorHourlyRate && (
                <div className='hourlyRateBlock__error'>
                  <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M9.00008 0.666656C4.40008 0.666656 0.666748 4.39999 0.666748 8.99999C0.666748 13.6 4.40008 17.3333 9.00008 17.3333C13.6001 17.3333 17.3334 13.6 17.3334 8.99999C17.3334 4.39999 13.6001 0.666656 9.00008 0.666656ZM9.00008 9.83332C8.54175 9.83332 8.16675 9.45832 8.16675 8.99999V5.66666C8.16675 5.20832 8.54175 4.83332 9.00008 4.83332C9.45842 4.83332 9.83342 5.20832 9.83342 5.66666V8.99999C9.83342 9.45832 9.45842 9.83332 9.00008 9.83332ZM9.83342 13.1667H8.16675V11.5H9.83342V13.1667Z'
                      fill='#F33C58'
                    />
                  </svg>

                  {hourlyRateIsEmpty && <span>Please enter a correct number using digits only.</span>}
                  {!hourlyRateIsEmpty && <span>This field cannot be empty.</span>}
                </div>
              )}
            </div>

            {/* hearAboutUsBlock
            <div className='hearAboutUsBlock'>
              <Label headline='Where did you hear about us?'></Label>
              <CustomSelector options={HEAR_ABOUT_OPTIONS} />

              <div className='extraField'>
                <InputField placeholder='Specify...' />
              </div>
            </div>*/}
          </div>
        </form>
        <Footer copyright='2020 © All rights reserved. X-Company Pty Ltd.' />
      </div>
    );
  }
}
