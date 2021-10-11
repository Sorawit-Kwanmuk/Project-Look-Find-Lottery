import axios from '../../config/axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';

import '../../style.css';

function ProfileEditor() {
  const { user } = useContext(AuthContext);

  const [profileImage, setProfileImage] = useState({ imageProfile: '' });
  const [qrCodeImage, setQrCodeImage] = useState({ qrCodeLine: '' });
  const [input, setInput] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    lineId: '',
    facebookId: '',
    location: '',
    etc: '',
    status: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        //error
        const response = await axios.get(`/profiles/${user.id}`);
        console.log(response.data.user.UserProfile.imageProfile);
        setInput({
          username: response.data.user.username,
          name:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.name
              : '',
          email: response.data.user.email,
          phone: response.data.user.phone,
          lineId:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.lineId
              : '',
          facebookId:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.facebookId
              : '',
          location:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.location
              : '',
          etc:
            response.data.user.UserProfile !== null
              ? response.data.user.UserProfile.etc
              : '',
          status: response.data.user.UserProfile === null ? 'create' : 'update',
        });
        setProfileImage(
          response.data.user.UserProfile !== null
            ? response.data.user.UserProfile.imageProfile
            : ''
        );
        setQrCodeImage(
          response.data.user.UserProfile !== null
            ? response.data.user.UserProfile.qrCodeImage
            : ''
        );
        // console.log(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);
  console.log(input);
  console.log(profileImage);

  const handleSaveProfile = async e => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append('cloudinput', profileImage.imageProfile);
      formData.append('cloudinput', qrCodeImage.qrCodeLine);
      const response = await axios.put(`/profiles/${user.id}`, input);

      // console.log('1');
      await axios.put(
        `/upload/upload-to-cloud/${user.id}`,
        // { imageProfile: input.imageProfile },
        // { qrCodeLine: input.qrCodeLine }
        formData
      );

      const res = () => {
        console.log(res);
        setProfileImage(res.data.imageProfile);
        setQrCodeImage(res.data.qrCodeLine);
      };
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className='profile_editor_area'>
      <div className='profile_editor_board'>
        <div className='label_style_profile_editor'>
          <label className='label_profile_editor'>แก้ไขโปรไฟล์</label>
        </div>
        <div className='profile_editer_top'>
          <div className='profile_picture'>
            <img src={profileImage} alt='' />
          </div>
          <div className='profile_qr'>
            <img src={qrCodeImage} alt='' />
          </div>
        </div>
        <div className='profile_editer_middle'>
          <div className='div_form_editor'>
            <form action='' className='form_style' onSubmit={handleSaveProfile}>
              <div className='div username_editor'>
                <div className='border'>
                  <label
                    htmlFor='username_editor'
                    className='label of_username_editor'>
                    Username
                  </label>
                </div>
                <input
                  type='text'
                  id='username_editor'
                  name='username_editor'
                  value={input.username}
                  onChange={e => setInput({ ...input, name: e.target.value })}
                  readOnly
                />
              </div>
              <div className='div name_editor'>
                <div className='border'>
                  <label htmlFor='name_editor' className='label of_name_editor'>
                    ชื่อ-นามสกุล
                  </label>
                </div>
                <input
                  type='text'
                  id='name_editor'
                  name='name2_editor'
                  value={input.name}
                  onChange={e => setInput({ ...input, name: e.target.value })}
                />
              </div>
              <div className='div email_editor'>
                <div className='border'>
                  <label htmlFor='email_editor' className='label of_ame_editor'>
                    Email
                  </label>
                </div>
                <input
                  type='text'
                  id='email_editor'
                  name='email_editor'
                  value={input.email}
                  onChange={e => setInput({ ...input, email: e.target.value })}
                />
              </div>
              <div className='div phone_editor'>
                <div className='border'>
                  <label
                    htmlFor='phone_editor'
                    className='label of_phone_editor'>
                    เบอร์โทร
                  </label>
                </div>
                <input
                  type='text'
                  id='phone_editor'
                  name='phone_editor'
                  value={input.phone}
                  onChange={e => setInput({ ...input, phone: e.target.value })}
                  readOnly
                />
              </div>
              <div className='div id_line_editor'>
                <div className='border'>
                  <label
                    htmlFor='id_line_editor'
                    className='label of_id_line_editor'>
                    ID LINE
                  </label>
                </div>
                <input
                  type='text'
                  id='id_line_editor'
                  value={input.lineId}
                  onChange={e => setInput({ ...input, lineId: e.target.value })}
                />
              </div>
              <div className='div facebook_editor'>
                <div className='border'>
                  <label
                    htmlFor='facebook_editor'
                    className='label of_facebook_editor'>
                    Facebook
                  </label>
                </div>
                <input
                  type='text'
                  id='facebook_editor'
                  value={input.facebookId}
                  onChange={e =>
                    setInput({ ...input, facebookId: e.target.value })
                  }
                />
              </div>
              <div className='div access_editor'>
                <div className='border border_access'>
                  <label
                    htmlFor='access_editor'
                    className='label of_access_editor'>
                    ที่อยู่ ณ ปัจจุบัน
                  </label>
                </div>
                <input
                  type='text'
                  id='access_editor'
                  value={input.location}
                  onChange={e =>
                    setInput({ ...input, location: e.target.value })
                  }
                />
              </div>
              <div className='div etc_editor'>
                <div className='border border_etc'>
                  <label htmlFor='etc_editor' className='label of_etc_editor'>
                    ข้อมูลอื่นๆ
                  </label>
                </div>
                <input
                  type='text'
                  id='etc_editor'
                  value={input.etc}
                  onChange={e => setInput({ ...input, etc: e.target.value })}
                />
              </div>
              <div className='div image_profile_editor'>
                <div className='border'>
                  <label
                    htmlFor='image_profile_editor'
                    className='label of_image_profile_editor'>
                    รูปโปรไฟล์
                  </label>
                </div>
                <input
                  type='file'
                  id='image_profile_editor'
                  onChange={e =>
                    setProfileImage({ imageProfile: e.target.files[0] })
                  }
                />
              </div>
              <div className='div image_qr_code_line_editor'>
                <div className='border'>
                  <label
                    htmlFor='image_qr_code_line_editor'
                    className='label of_image_qr_code_line_editor'>
                    QR Code Line
                  </label>
                </div>
                <input
                  type='file'
                  id='image_qr_code_line_editor'
                  onChange={e =>
                    setQrCodeImage({ qrCodeLine: e.target.files[0] })
                  }
                />
              </div>
              <button type='submit'>บันทึก</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileEditor;
