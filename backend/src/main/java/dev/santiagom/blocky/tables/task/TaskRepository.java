package dev.santiagom.blocky.tables.task;

import dev.santiagom.blocky.tables.task.dtos.TaskResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findAllByEpic_Id(Long epicId);
}
