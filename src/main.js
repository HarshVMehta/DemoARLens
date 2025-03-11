import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
} from '@snap/camera-kit';

(async function () {
    try {
        var cameraKit = await bootstrapCameraKit({
            apiToken: api
        });

        const session = await cameraKit.createSession();
        const canvasElement = document.getElementById('canvas');
        if (canvasElement) {
            canvasElement.replaceWith(session.output.live);
        } else {
            console.error('Element with ID "canvas" not found.');
            return;
        }

        const { lenses } = await cameraKit.lensRepository.loadLensGroups(['96e1322f-2b1c-49bd-b995-932ec7153531']);
        if (lenses.length > 0) {
            session.applyLens(lenses[0]);
        } else {
            console.error('No lenses found.');
            return;
        }

        let mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: 'environment'
            }
        });

        const source = createMediaStreamSource(
            mediaStream, {
                cameraType: 'back'
            }
        );

        await session.setSource(source);

        session.source.setRenderSize(window.innerWidth, window.innerHeight);
        session.play();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
