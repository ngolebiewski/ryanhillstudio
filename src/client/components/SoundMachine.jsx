import { SoundOutlined, SoundFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';


const SoundMachine = () => {
  return (
    <div>
      <Tooltip title="Sound on/off">
        <Button
          type="text"
          icon={<SoundOutlined />}
        />
      </Tooltip>
    </div>
  )
}

export default SoundMachine;