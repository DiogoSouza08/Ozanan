const $fileName = document.querySelector('.upload-file-name');
const $uploadProgress = document.querySelector('.upload-progress');
const $uploadDrop = document.querySelector('.upload-drop');
const $uploadInput = document.querySelector('.upload-input');
const $uploadIcon = document.querySelector('.upload-icon');
const $uploadingIcon = document.querySelector('.uploading-icon');
const $doneIcon = document.querySelector('.done-icon');
const $uploadButton = document.querySelector('.upload-button');

let filename;
let state = 'choose';

const updateState = newState => {
  state = newState;
  $uploadButton.textContent = {
    choose: 'Choose File',
    upload: 'Upload File',
    uploading: 'Uploading File...',
    done: 'Done'
  }[state];

	const uploadActive = ['choose', 'upload'].includes(state);
	$uploadDrop.classList.toggle('active', uploadActive);
	$uploadInput.disabled= !uploadActive;
  $uploadIcon.classList.toggle('hidden', state != 'choose');
  $fileName.classList.toggle('hidden', state != 'upload');
  $uploadingIcon.classList.toggle('hidden', state != 'uploading');
  $doneIcon.classList.toggle('hidden', state != 'done');
};
updateState('choose');

const handleInputChange = event => {
  filename = event?.target?.files[0]?.name ?? '';

  $fileName.textContent = filename;
  updateState(filename ? 'upload' : 'choose');
};

const setProgress = progress => {
  $uploadProgress.style.setProperty('--progress', progress);
};

const clickFileUpload = () => {
  switch (state) {
    case 'choose':
      $uploadInput.click();
      break;
    case 'upload':
      updateState('uploading');
			// fake upload
      let progress = 0;
      const interval = setInterval(() => {
        setProgress(++progress + '0%');
      }, 350);
      setTimeout(() => {
        updateState('done');
        clearInterval(interval);
      }, 3500);
      break;
    case 'done':
      updateState('choose');
      setProgress('0%');
      break;
  }
};
