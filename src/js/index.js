import {PipeImg} from './pipeImg';
import {PipeImgUI} from './pipeImgUI';

new PipeImgUI({
    source: 'assets/Jellyfish.jpg'
});
// let pipeImg = new PipeImg({
//     source: 'assets/Jellyfish.jpg',
//     onSuccess: (pipeImg) => {
//         pipeImg.rotate();
//         pipeImg.scale();      
//         pipeImg.mark();
//         pipeImg.rollback();
//         pipeImg.reset();
//         document.querySelector('#J-preview-container').appendChild(pipeImg.results[pipeImg.results.length - 1]);
//     }
// });